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

const PostPage = () => {
  const [postData, setPostData] = useState<DocumentData>()
  const [infoData, setInfoData] = useState<DocumentData>()
  const [commentData, setCommentData] = useState<DocumentData>()
  const [infocommentData, setInfoCommentData] = useState<DocumentData>()
  const [likeData, setLikeData] = useState<boolean | null>()
  const [amountLike, setAmountLike] = useState<DocumentData>()
  const [commentDescription, setCommentDescription] = useState<string>('')

  const currentViewPost = localStorage.getItem('currentViewPost')

  useEffect(() => {
    async function fetch() {
      if (!currentViewPost) return
      const post = (await get_one_post(currentViewPost)) as DocumentData
      const info = (await get_info(post?.AccountID)) as DocumentData
      const comment = (await get_comment(currentViewPost)) as DocumentData
      const infoComment = (await get_info_comment(comment)) as DocumentData[]
      const countLike = await getLikeOfPost(currentViewPost)

      if (!applicationStore.user) {
        setLikeData(null)
      } else {
        const LikeDoc = await getDocLike(
          'Like:' + applicationStore.user.uid + '_' + currentViewPost
        )
        setLikeData(LikeDoc?.Status)
      }
      // const countLike = await getLikeOfPost(currentViewPost)
      setAmountLike(countLike)

      setPostData(post[1])
      setInfoData(info)
      setCommentData(comment)
      setInfoCommentData(infoComment)
      setAmountLike(countLike)
    }
    fetch()
  }, [])

  // console.log(infocommentData)
  // if (!!mockInfoComment) {
  //   console.log(commentData)
  //   console.log(mockInfoComment.length)
  // }

  const handleOnLike = async () => {
    const currentViewPost = localStorage.getItem('currentViewPost')
    if (!applicationStore.user || !currentViewPost) return
    like(applicationStore.user.uid, currentViewPost)

    const status = likeData
    setLikeData(!status)
    const countLike = await getLikeOfPost(currentViewPost)
    setAmountLike(countLike)
    console.log(amountLike)
  }

  const handleOnUnlike = async () => {
    const currentViewPost = localStorage.getItem('currentViewPost')
    if (!applicationStore.user || !currentViewPost) return
    const likeID = 'Like:' + applicationStore.user.uid + '_' + currentViewPost
    await disable({}, likeID, 'Like')

    const status = likeData
    setLikeData(!status)
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
    setTimeout(() => {
      fetchComment(currentViewPost)
    }, 0)
  }

  async function fetchComment(currentViewPost: string) {
    const comment = (await get_comment(currentViewPost)) as DocumentData
    const infoComment = (await get_info_comment(comment)) as DocumentData[]
    console.log(comment)
    console.log(infoComment)
    setCommentData(comment)
    console.log(commentData)
    setInfoCommentData(infoComment)
  }

  // console.log(infocommentData)
  const mockFiles = [
    ['สรุปบทที่ 1.pdf', '23.40 MB'],
    ['สรุปบทที่ 2.pdf', '4.70 MB'],
    ['สรุปบทที่ 3.pdf', '5.20 MB'],
    ['สรุปแถม.jpg', '2.70 MB'],
  ]
  let postOwner = infoData?.DisplayName ? infoData?.DisplayName : ''
  let datePosted = postData?.DateEdited
    ? new Date(postData?.DateEdited?.seconds * 1000).toLocaleString()
    : '00/00/0000, 00:00:00 AM'
  let title = postData?.Title ? postData?.Title : ''
  let descript = postData?.Description ? postData?.Description : ''
  const mockTags = postData?.TagID ? postData?.TagID : ['']
  const currentSearch = localStorage.getItem('currentSearch')
  const mockSubjectName = currentSearch
    ? [
        currentSearch.split(' ')[0],
        currentSearch.split('(')[1].replace(')', ''),
      ]
    : 'รหัสวิชา | SubjectName'
  const mockComment = !!commentData ? commentData : ['']
  const mockInfoComment = !!infocommentData ? infocommentData : ['']
  //const [allTag, setAllTag] = useState<string[]>(mockTags)
  //console.log(mockTags)
  //console.log(allTag)
  const [allFile, setAllFile] = useState<string[][]>(mockFiles)
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

  // const [allComment, setAllComment] =
  //   useState<(string | number)[][]>(mockComment)

  const maxColor = colors.length
  return (
    <div className="white-bg pt-5">
      <Container className="style1 box-shadow bg-secondary mx-auto my-5 px-5 p-5">
        <div className="">
          <div className="w-content d-flex justify-content-between">
            <div className="max-w-content d-inline-block">
              <div className="h-100 d-flex align-items-center flex-wrap">
                {mockTags.map((tag, idx) => (
                  <div className="d-inline-block mr-2 rounded-lg"
                    key={tag}
                    style={{backgroundColor: colors[maxColor - (idx % maxColor) - 1],}}
                  >
                    <div className="style4 p-2 px-3 max-w-content cursor-pointer">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="style5 d-inline-block py-2 m-0 text-right cursor-pointer"
                 style={{maxWidth: "35%"}}
            >
              {mockSubjectName[0]} | {mockSubjectName[1]}
            </div>
          </div>
        </div>
        <div className="style6 d-flex pt-3"
             style={{maxWidth: "70%"}}
        >
          {title}
        </div>
        <div className="mt-3">
          <div className="w-100 d-flex justify-content-between m-0">
            <div className="d-inline-block">
              <div className="d-flex">
                <p className="textPostStyle h4 d-inline-block m-0 mt-1 mr-2">
                  โพสต์โดย
                </p>
                <img className="style8 d-inline-block mx-2 cursor-pointer"
                    src={user_icon}
                />{' '}
                <p className= "textPostStyle h4 font-weight-bold d-inline-vlock mt-1">
                  {postOwner}
                </p>
              </div>
            </div>
            <div className="style9 d-inline-block">
              {datePosted}
            </div>
          </div>
        </div>

        <div className="style10 text-justify mt-4 pt-4 pb-3">
          {descript}
        </div>
      </Container>

      <Container className="style1 box-shadow bg-secondary mx-auto my-5 p-5 pt-4">
        <h5 className="style12 mb-4">
          ไฟล์ที่แนบมาด้วย
        </h5>
        <div className="max-w-content d-flex align-items-center flex-wrap">
          {allFile.map((file) => (
            <div className="style13 mr-4 mb-4 cursor-pointer"
                 key={file[0]}
            >
              <div className="style14 d-flex flex-column pb-3">
                <div className="d-block mx-auto">
                  <img
                    src={file[0].split('.')[1] == 'pdf' ? pdf : jpg}
                    style={{ width: '125px', height: '125px' }}
                  />
                </div>
                <div className="style15 d-block mx-auto mb-0">
                  <div className="text-truncate mb-3 px-3"
                       style={{maxWidth: "125px"}}
                  >
                    {file[0]}
                  </div>
                  {file[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="style1 box-shadow bg-secondary px-0 mt-5">
        <div  className="mx-auto px-5 pt-5 pb-4">
          <div className="style17 mb-5">
            <div className="w-content d-flex justify-content-between">
              <div className="style18 d-inline-block">
                การตอบกลับ
              </div>
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
                  <p className="h5 font-weight-bold d-inline-block">{commentData?.length}</p>
                </div>
                <div className="style19 mt-0 d-inline-block">
                  <img
                    className="mr-2 cursor-pointer"
                    onClick={likeData ? handleOnUnlike : handleOnLike}
                    style={{
                      marginTop: "-10px",
                      width: '20px',
                      height: '20px',
                    }}
                    src={likeData ? Like : Unlike}
                  />
                  <p className="h5 font-weight-bold d-inline-block">{amountLike}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {commentData?.length ? mockInfoComment?.map((infoComment, index) => (
              <div className="style21 d-block bg-white mx-auto w-100 p-4 mb-3">
                <div className="w-content d-flex justify-content-between">
                  <div className="d-flex align-items-center"
                       style={{width: "80%"}}
                  >
                    <p className="style22 text-break pl-3">
                      {mockComment[index]?.Description}
                    </p>
                  </div>

                  <div className="d-flex pl-4"
                       style={{width: "24%"}}
                  >
                    <div className=" d-inline-block"
                         style={{verticalAlign: "top"}}
                    >
                      <img className="style23 mr-3"
                          src={userIcon}
                      />
                    </div>
                    <div className="d-inline-block"
                        style={{width: "74%"}}
                    >
                      <p className="h6 d-inline-flex mr-1 my-0">
                        by
                      </p>
                      <p className="style25 d-inline-flex text-truncate my-0 cursor-pointer"
                         data-toggle="tooltip"
                         data-placement="top" 
                         title={infoComment?.DisplayName}
                         style={{width: "75%", 
                                maxWidth: "118.56px"
                         }}
                      >
                        {infoComment?.DisplayName}
                      </p>
                    <div className="style24 d-block text-truncate">
                      {convertTStoDate(mockComment[index]?.DateEdited)}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : 
            <p className="h6 text-center">
              ดูเหมือนว่ายังไม่มีความคิดเห็นใด ๆ หากคุณต้องการเสนอแนะสามารถตอบกลับได้ผ่านช่องทางด้านล่าง
            </p>
            }
          </div>

        </div>
        <div className="style26 d-block mx-auto px-5 pt-4 pb-1">
          <div className="style27 form-group shadow d-flex"
               style={{borderRadius: "10px",}}
          >
            <input
              type="text"
              className="form-control pl-3 border-0"
              style={{height: "40px",
                      borderRadius: "10px 0px 0px 10px",
              }}
              placeholder="ตอบกลับโพสต์นี้..."
              onChange={(e) => setCommentDescription(e.target.value)}
            />
            <button
              type="submit"
              className="style28 btn btn-primary btn-sm px-3 border-0"
              style={{backgroundColor: "#FFFFFF",
                      borderRadius: "0 10px 10px 0",}}
            >
              <img className="style29"
                src={sendArrow}
                onClick={handleOnAddComment}
              />
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PostPage