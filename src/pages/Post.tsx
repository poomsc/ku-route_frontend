import React from 'react'
import '../PostStyles.css'
import { Container, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import user_icon from './../assets/icons/user-icon.png'
import { url } from 'inspector'
import pdf from './../assets/icons/PDF.png'
import jpg from './../assets/icons/JPG.png'
import userIcon from './../assets/icons/user-icon.png'
import sendArrow from './../assets/icons/sendArrow.png'
import Comment from './../assets/icons/Comment.png'
import Like from './../assets/icons/Like.png'
import Unlike from './../assets/icons/Unlike.png'
import { collection, DocumentData } from '@firebase/firestore'
import {
  get_comment,
  get_file,
  get_info,
  get_info_comment,
  get_one_post,
} from 'service/system'
import applicationStore from 'stores/applicationStore'
import { convertTStoDate } from './AllPost'
import { create_comment, like, disable } from 'service/user'
import { getDocLike, getLikeOfPost } from 'service/system'
import { awaitExpression } from '@babel/types'
import { getDownloadURL, StorageReference } from '@firebase/storage'
import { Document, Page, pdfjs } from 'react-pdf'

const PostPage = () => {
  const [postData, setPostData] = useState<DocumentData>()
  const [infoData, setInfoData] = useState<DocumentData>()
  const [commentData, setCommentData] = useState<DocumentData>()
  const [infocommentData, setInfoCommentData] = useState<DocumentData>()
  const [likeData, setLikeData] = useState<boolean>()
  const [amountLike, setAmountLike] = useState<number>()
  const [commentDescription, setCommentDescription] = useState<string>('')
  const [allFiles, setAllFiles] = useState<StorageReference[]>()
  const [linkFiles, setLinkFiles] = useState<string[]>()

  const currentViewPost = localStorage.getItem('currentViewPost')

  useEffect(() => {
    async function fetch() {
      if (!currentViewPost) return
      const post = (await get_one_post(currentViewPost)) as DocumentData
      const info = (await get_info(post[1]?.AccountID)) as DocumentData
      const comment = (await get_comment(currentViewPost)) as DocumentData
      const infoComment = await get_info_comment(comment)
      const countLike = (await getLikeOfPost(currentViewPost)) as number
      const files = (await get_file(currentViewPost)) as StorageReference[]
      const fileUrl = await Promise.all(
        files.map((file) => getDownloadURL(file))
      )

      console.log(allFiles)
      console.log(infoComment)
      console.log(fileUrl)

      if (applicationStore.user) {
        const LikeDoc = await getDocLike(
          'Like:' + applicationStore.user.uid + '_' + currentViewPost
        )
        setLikeData(LikeDoc?.Status)
      }
      // const countLike = await getLikeOfPost(currentViewPost)
      setPostData(post[1])
      setInfoData(info)
      setCommentData(comment)
      setInfoCommentData(infoComment)
      setAmountLike(countLike)
      setAllFiles(files)
      setLinkFiles(fileUrl)
    }
    fetch()
  }, [])

  const handleOnLike = async () => {
    const currentViewPost = localStorage.getItem('currentViewPost')
    if (!applicationStore.user || !currentViewPost) return
    await like(applicationStore.user.uid, currentViewPost)

    setLikeData(!likeData)
    const countLike = await getLikeOfPost(currentViewPost)
    setAmountLike(countLike)
  }

  const handleOnUnlike = async () => {
    const currentViewPost = localStorage.getItem('currentViewPost')
    if (!applicationStore.user || !currentViewPost) return
    const likeID = 'Like:' + applicationStore.user.uid + '_' + currentViewPost
    await disable({}, likeID, 'Like')

    setLikeData(!likeData)
    const countLike = await getLikeOfPost(currentViewPost)
    setAmountLike(countLike)
  }

  const handleOnAddComment = async () => {
    const currentViewPost = localStorage.getItem('currentViewPost')
    if (!applicationStore.user || !currentViewPost || commentDescription == '')
      return
    console.log(commentDescription)
    create_comment({
      AccountID: applicationStore.user.uid,
      PostID: currentViewPost,
      Description: commentDescription,
    })
    const comment = (await get_comment(currentViewPost)) as DocumentData
    const infoComment = await get_info_comment(comment)
    if (comment?.length && infoComment?.length) {
      setCommentData(comment)
      console.log(commentData)
      setInfoCommentData(infoComment)
    }
  }

  let postOwner = infoData?.DisplayName ? infoData?.DisplayName : ''
  let datePosted = postData?.DateEdited
    ? new Date(postData?.DateEdited?.seconds * 1000).toLocaleString()
    : '00/00/0000, 00:00:00 AM'
  let title = postData?.Title ? postData?.Title : ''
  let descript = postData?.Description ? postData?.Description : ''
  const mockTags = postData?.TagID ? postData?.TagID : ['']
  console.log(postData?.SubjectID, postData?.SubjectENG)
  const SubjectID = postData?.SubjectID ? postData?.SubjectID : 'รหัสวิชา'
  const SubjectENG = postData?.SubjectENG ? postData?.SubjectENG : 'SubjectName'

  const colors = [
    '#5697C4',
    '#E0598B',
    '#E278A3',
    '#9163B6',
    '#993767',
    '#A34974',
    '#BE5168',
    '#C84A52',
    '#E16452',
    '#F19670',
    '#E9D78E',
    '#E4BE7F',
    '#74C493',
  ]

  const maxColor = colors.length
  return (
    <div className="white-bg pt-5">
      <Container className="style1 box-shadow bg-secondary mx-auto my-5 px-5 p-5">
        <div className="">
          <div className="w-content d-flex justify-content-between">
            <div className="max-w-content d-inline-block">
              <div className="h-100 d-flex align-items-center flex-wrap">
                {mockTags.map((tag, idx) => (
                  <div
                    className="d-inline-block mr-2 rounded-lg"
                    key={tag}
                    style={{
                      backgroundColor: colors[maxColor - (idx % maxColor) - 1],
                    }}
                  >
                    <div className="style4 p-2 px-3 max-w-content cursor-pointer">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="style5 d-inline-block py-2 m-0 text-right cursor-pointer"
              style={{ maxWidth: '35%' }}
            >
              {SubjectID} | {SubjectENG}
            </div>
          </div>
        </div>
        <div className="style6 d-flex pt-3" style={{ maxWidth: '70%' }}>
          {title}
        </div>
        <div className="mt-3">
          <div className="w-100 d-flex justify-content-between m-0">
            <div className="d-inline-block">
              <div className="d-flex">
                <p className="textPostStyle h4 d-inline-block m-0 mt-1 mr-2">
                  โพสต์โดย
                </p>
                <img
                  className="style8 d-inline-block mx-2 cursor-pointer"
                  src={user_icon}
                />{' '}
                <p className="textPostStyle h4 font-weight-bold d-inline-vlock mt-1">
                  {postOwner}
                </p>
              </div>
            </div>
            <div className="style9 d-inline-block">{datePosted}</div>
          </div>
        </div>

        <div className="style10 text-justify mt-4 pt-4 pb-3">{descript}</div>
      </Container>

      <Container className="style1 box-shadow bg-secondary mx-auto my-5 p-5 pt-4">
        <h5 className="style12 mb-4">ไฟล์ที่แนบมาด้วย</h5>
        <div className="max-w-content d-flex align-items-center flex-wrap">
          {allFiles &&
            linkFiles &&
            allFiles.map((file, index) => {
              const fileSP = file.name.split('.')
              const extFile = fileSP[fileSP.length - 1]
              return (
                <a
                  className="style13 mr-4 mb-4 cursor-pointer"
                  key={file.name}
                  href={linkFiles[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="style14 d-flex flex-column pb-3">
                    <div className="d-block mx-auto">
                      <img
                        src={extFile == 'pdf' ? pdf : jpg}
                        style={{ width: '125px', height: '125px' }}
                      />
                    </div>
                    <div className="style15 d-block mx-auto mb-0">
                      <div
                        className="text-truncate mb-3 px-3"
                        style={{ maxWidth: '125px' }}
                      >
                        {fileSP[0]}
                      </div>
                      .{extFile.toUpperCase()}
                    </div>
                  </div>
                </a>
              )
            })}
        </div>
      </Container>

      <Container className="style1 box-shadow bg-secondary px-0 mt-5">
        <div className="mx-auto px-5 pt-5 pb-4">
          <div className="style17 mb-5">
            <div className="w-content d-flex justify-content-between">
              <div className="style18 d-inline-block">การตอบกลับ</div>
              <div className="d-inline-block">
                <div className="style20 mt-0 d-inline-block pr-1 mr-3">
                  <img
                    className="mr-2"
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                    src={Comment}
                  />
                  <p className="h5 font-weight-bold d-inline-block">
                    {commentData?.length}
                  </p>
                </div>
                <div className="style19 mt-0 d-inline-block">
                  <img
                    className="mr-2 cursor-pointer"
                    onClick={likeData ? handleOnUnlike : handleOnLike}
                    style={{
                      marginTop: '-10px',
                      width: '20px',
                      height: '20px',
                    }}
                    src={likeData ? Like : Unlike}
                  />
                  <p className="h5 font-weight-bold d-inline-block">
                    {amountLike}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {infocommentData && commentData ? (
              infocommentData.map((infoComment, index) => (
                <div className="style21 d-block bg-white mx-auto w-100 p-4 mb-3">
                  <div className="w-content d-flex justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: '80%' }}
                    >
                      <p className="style22 text-break pl-3">
                        {commentData[index]?.Description}
                      </p>
                    </div>

                    <div className="d-inline-block pl-4">
                      <div
                        className=" d-inline-block"
                        style={{ verticalAlign: 'top' }}
                      >
                        <img className="style23 mr-3" src={userIcon} />
                      </div>
                      <div
                        className="d-inline-block max-w-content"
                        style={{ width: '70%' }}
                      >
                        <p className="h6 d-inline-block mr-1 my-0">by</p>
                        <p
                          className="style25 d-inline-flex text-truncate my-0 cursor-pointer"
                          style={{ width: '75%' }}
                        >
                          {infoComment?.DisplayName}
                        </p>
                        <div className="style24 d-block">
                          {convertTStoDate(commentData[index]?.DateEdited)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="h6 text-center">
                ดูเหมือนว่ายังไม่มีความคิดเห็นใด ๆ
                หากคุณต้องการเสนอแนะสามารถตอบกลับได้ผ่านช่องทางด้านล่าง
              </p>
            )}
          </div>
        </div>

        <div className="style26 d-block mx-auto px-5 pt-4 pb-1">
          <div
            className="style27 form-group shadow d-flex"
            style={{ borderRadius: '10px' }}
          >
            <input
              type="text"
              className="form-control pl-3 border-0"
              style={{ height: '40px', borderRadius: '10px 0px 0px 10px' }}
              placeholder="ตอบกลับโพสต์นี้..."
              onChange={(e) => setCommentDescription(e.target.value)}
            />
            <button
              type="submit"
              className="style28 btn btn-primary btn-sm px-3 border-0"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <img
                className="style29"
                src={sendArrow}
                onClick={handleOnAddComment}
              />
            </button>
          </div>
        </div>
        {/* {infocommentData &&
          commentData &&
          infocommentData.map((infoComment, index) => (
            <div className="d-block mx-auto px-5">
              <div
                className="d-block d-inline-flex"
                style={{
                  marginBottom: '15px',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '5px 5px 5px 5px',
                  height: '50px',
                  width: '1060px',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    color: '#525252',
                    width: '860px',
                    height: '50px',
                    paddingLeft: '3vw',
                    lineHeight: '50px',
                    border: 'none',
                  }}
                >
                  {commentData[index].Description}
                </div>
                <div className="py-2">
                  <img
                    src={userIcon}
                    style={{
                      border: 'none',
                      background: '#E4E6E7',
                      width: '35px',
                      height: '35px',
                      borderRadius: '50px',
                    }}
                  />
                </div>
                <div
                  className="d-inline-flex"
                  style={{
                    width: '165px',
                    height: '15px',
                  }}
                >
                  <div
                    className="py-2"
                    style={{
                      color: '#525252',
                      fontSize: '12px',
                      fontWeight: 'lighter',
                      border: 'none',
                      width: '23px',
                    }}
                  >
                    &nbsp;&nbsp;by&nbsp;&nbsp;
                    <br />
                    &nbsp;&nbsp;{convertTStoDate(commentData[index].DateEdited)}
                  </div>
                  <div
                    className="d-inline-flex py-2"
                    style={{
                      color: '#525252',
                      fontSize: '15px',
                      fontWeight: 'bolder',
                      border: 'none',
                    }}
                  >
                    {infoComment?.DisplayName}
                  </div>
                </div>
              </div>
            </div>
          ))} */}
      </Container>
    </div>
  )
}

export default PostPage
