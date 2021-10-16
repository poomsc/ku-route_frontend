import React from 'react'
import '../PostStyles.css'
import {
  Container,
  Card,
  FormControl,
  InputGroup,
  CloseButton,
} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import user_icon from './../assets/icons/user-icon.png'
import { url } from 'inspector'
import pdf from './../assets/icons/PDF.png'
import jpg from './../assets/icons/JPG.png'
import userIcon from './../assets/icons/user-icon.png'
import MoreLabel from '@material-ui/icons/MoreHoriz'
import sendArrow from './../assets/icons/sendArrow.png'
import Comment from './../assets/icons/Comment.png'
import Like from './../assets/icons/Like.png'
import Unlike from './../assets/icons/Unlike.png'
import { collection, DocumentData, serverTimestamp } from '@firebase/firestore'
import {
  createHistoryComment,
  get_comment,
  get_file,
  get_info,
  get_info_comment,
  get_one_post,
} from 'service/system'
import applicationStore from 'stores/applicationStore'
import { convertTStoDate } from './AllPost'
import { create_comment, like, disable, edit } from 'service/user'
import { getDocLike, getLikeOfPost } from 'service/system'
import { awaitExpression } from '@babel/types'
import { getDownloadURL, StorageReference } from '@firebase/storage'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip,
  UncontrolledPopover,
} from 'reactstrap'
import { useLocation } from 'react-router'
import { modalClasses } from '@mui/material'
import { Modal, Button as ButtonB } from 'semantic-ui-react'
import { ModalDisableComment, ModalReport } from 'components/Modal'
import { right } from '@popperjs/core'
import { ApplicationVerifier } from '@firebase/auth'

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
  const [postOwnerUID, setPostOwnerUID] = useState('')
  const [open, setOpen] = useState(false)
  const [editCommentBlock, setEditCommentBlock] = useState(-1)
  const [newCommentEdited, setNewCommentEdited] = useState('')
  const [saveCommentEnable, setSaveCommentEnable] = useState(false)

  const { pathname } = useLocation()
  const PostID = pathname.split('/')[2]

  useEffect(() => {
    async function fetch() {
      const post = (await get_one_post(PostID)) as DocumentData
      const info = (await get_info(post[1]?.AccountID)) as DocumentData
      const comment = (await get_comment(PostID)) as DocumentData
      const infoComment = await get_info_comment(comment)
      const countLike = (await getLikeOfPost(PostID)) as number
      const files = (await get_file(PostID)) as StorageReference[]
      const fileUrl = await Promise.all(
        files.map((file) => getDownloadURL(file))
      )

      const TEST = await createHistoryComment('kkY5SaNaRdqaeZ0ToVbF')

      if (applicationStore.user) {
        const LikeDoc = await getDocLike(
          'Like:' + applicationStore.user.uid + '_' + PostID
        )
        setLikeData(LikeDoc?.Status)
      }

      setPostData(post[1])
      setPostOwnerUID(post[1]?.AccountID)
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
    if (!applicationStore.user) return
    await like(applicationStore.user.uid, PostID)

    setLikeData(!likeData)
    const countLike = await getLikeOfPost(PostID)
    setAmountLike(countLike)
  }

  const handleOnUnlike = async () => {
    if (!applicationStore.user) return
    const likeID = 'Like:' + applicationStore.user.uid + '_' + PostID
    await disable({}, likeID, 'Like')

    setLikeData(!likeData)
    const countLike = await getLikeOfPost(PostID)
    setAmountLike(countLike)
  }

  const handleOnAddComment = async (text) => {
    if (!applicationStore.user || text == '') return
    console.log(text)
    create_comment({
      AccountID: applicationStore.user.uid,
      PostID: PostID,
      Description: text,
    })
    const comment = (await get_comment(PostID)) as DocumentData
    const infoComment = await get_info_comment(comment)
    if (comment?.length && infoComment?.length) {
      setCommentData(comment)
      console.log(commentData)
      setInfoCommentData(infoComment)
    }
    // reset comment message
    setEditCommentBlock(editCommentBlock != -1 ? editCommentBlock + 1 : -1)
    setCommentDescription('')
  }

  const handleOnEditComment = (index) => {
    setEditCommentBlock(index)
  }

  const handleOnDeleteComment = async (CommentID: string) => {
    const comment = (await get_comment(PostID)) as DocumentData
    const infoComment = await get_info_comment(comment)
    if (comment?.length && infoComment?.length) {
      setCommentData(comment)
      setInfoCommentData(infoComment)
    }
  }

  const handleOnReport = () => {
    // doSomething;
  }

  const handleOnEditCommentChange = (oldComment, event: any) => {
    setNewCommentEdited(event.target.value)
    checkChangeData(oldComment, event)
  }

  const checkChangeData = (attr, event) => {
    // Check equal of two string
    if (attr && !(event.target.value === attr)) {
      setSaveCommentEnable(true)
    } else if (!attr) {
      setSaveCommentEnable(true)
    } else {
      setSaveCommentEnable(false)
    }
  }

  const handleOnSubmitEditedComment = async (text) => {
    let changedInfo = {}
    changedInfo['Description'] = text
    changedInfo['DateEdited'] = serverTimestamp()
    edit(changedInfo, targetUUID, databaseTarget)
    const comment = (await get_comment(PostID)) as DocumentData
    const infoComment = await get_info_comment(comment)
    if (comment?.length && infoComment?.length) {
      setCommentData(comment)
      setInfoCommentData(infoComment)
    }
    setSaveCommentEnable(false)
    setEditCommentBlock(-1)
    setNewCommentEdited('')
  }

  const PopoverItem = (props) => {
    const { id, item } = props

    return (
      <span>
        <UncontrolledPopover
          className="rounded-25"
          style={{ minWidth: '225px' }}
          placement={item.placement}
          target={'Popover-' + id}
          trigger="legacy"
        >
          <PopoverHeader className="font-weight-bold py-2">
            <p className="style25 p-0 m-0">{item.text?.DisplayName}</p>
          </PopoverHeader>
          <PopoverBody>
            <div className="d-inline-flex">
              <img className="style23 mr-3" src={userIcon} />
              <div className="style25 d-flex-block">
                <p className="p-0 m-0 font-weight-light">
                  {item.text?.Privacy[0]
                    ? item.text?.Name + ' ' + item.text?.Surname
                    : ' '}
                </p>
                <p className="p-0 m-0 font-weight-light">
                  {' '}
                  {item.text?.Faculty}
                </p>
                <div className="mt-2"></div>
                <div className="max-h-content p-0 m-0 d-flex">
                  <p className="p-0 m-0 font-weight-bolder d-inline-flex mr-2">
                    {item.text?.Privacy[2] && item.text?.Mail ? 'E-mail: ' : ''}
                  </p>
                  <p className="p-0 m-0 d-inline-flex font-weight-light">
                    {item.text?.Privacy[2] ? item.text?.Mail : ''}
                  </p>
                </div>
                <div className="max-h-content p-0 m-0 d-flex">
                  <p className="p-0 m-0 font-weight-bolder d-inline-flex mr-2">
                    {item.text?.Privacy[3] && item.text?.Phone ? 'Phone: ' : ''}
                  </p>
                  <p className="p-0 m-0 d-inline-flex font-weight-light">
                    {item.text?.Privacy[3] ? item.text?.Phone : ''}
                  </p>
                </div>
                <div className="max-h-content p-0 m-0 d-flex">
                  <p className="p-0 m-0 font-weight-bolder d-inline-flex mr-2">
                    {item.text?.Privacy[4] && item.text?.Facebook
                      ? 'Facebook: '
                      : ''}
                  </p>
                  <p className="p-0 m-0 d-inline-flex font-weight-light">
                    {item.text?.Privacy[4] ? item.text?.Facebook : ''}
                  </p>
                </div>
                <div className="max-h-content p-0 m-0 d-flex">
                  <p className="p-0 m-0 font-weight-bolder d-inline-flex mr-2">
                    {item.text?.Privacy[5] && item.text?.Instagram
                      ? 'Instagram: '
                      : ''}
                  </p>
                  <p className="p-0 m-0 d-inline-flex font-weight-light">
                    {item.text?.Privacy[5] ? item.text?.Instagram : ''}
                  </p>
                </div>
              </div>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
      </span>
    )
  }

  const MoreItem = (props) => {
    const { id, item } = props
    const className =
      'h6 w-100 bg-white hover-darken py-1 px-2 text-left rounded-lg'

    return (
      <span>
        <UncontrolledPopover
          className="rounded-25"
          style={{ minWidth: '225px' }}
          placement={item.placement}
          target={'Popover-' + id}
          trigger="legacy"
        >
          <PopoverBody className="px-2 pt-2 py-1">
            <div className="style25 font-weight-light d-flex-block">
              <Button
                className={className}
                onClick={(e) => handleOnEditComment(id / 2 - 1)}
                hidden={applicationStore.user?.uid != item.data[1].AccountID}
              >
                แก้ไข...
              </Button>

              <ModalDisableComment
                CommentID={item.data[0]}
                onClick={handleOnDeleteComment}
              >
                <Button
                  variant="primary"
                  className={className}
                  hidden={applicationStore.user?.uid != item.data[1].AccountID}
                >
                  ลบความคิดเห็น
                </Button>
              </ModalDisableComment>

              <ModalReport
                CommentID={item.data[0]}
                onClick={handleOnDeleteComment}
              >
                <Button className={className} onClick={handleOnReport}>
                  รายงานความไม่เหมาะสม
                </Button>
              </ModalReport>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
      </span>
    )
  }

  const renderEditBlock = (commentBlock) => {
    let content = commentBlock[1]
    targetUUID = commentBlock[0]

    return (
      <Container className="d-block w-100 pl-0">
        <InputGroup className="rounded-สเ bg-white shadow mb-4">
          <FormControl
            as="textarea"
            defaultValue={content?.Description}
            aria-label="title"
            className="rounded-10 border-0"
            placeholder="แก้ไขความคิดเห็น..."
            onChange={(e) => handleOnEditCommentChange(content?.Description, e)}
            rows={3}
            style={{ minHeight: '5rem' }}
          />
        </InputGroup>

        <div className="d-flex justify-content-end">
          <div className="mx-2"></div>
          <Button
            className="bg-dark text-white mr-3"
            style={{ width: '7rem' }}
            type="submit"
            onClick={(e) => {
              handleOnEditComment(-1)
              setSaveCommentEnable(false)
              setNewCommentEdited('')
            }}
          >
            ยกเลิก
          </Button>
          <Button
            className="bg-primary text-white"
            disabled={!saveCommentEnable}
            style={{ width: '7rem' }}
            type="submit"
            onClick={(e) => {
              handleOnSubmitEditedComment(newCommentEdited)
            }}
          >
            บันทึก
          </Button>
        </div>
      </Container>
    )
  }

  const genLoadLabel = () => {
    return labelCount++
  }

  let postOwner = infoData?.DisplayName ? infoData?.DisplayName : ''
  let datePosted = postData?.DateEdited
    ? new Date(postData?.DateEdited?.seconds * 1000).toLocaleString()
    : '00/00/0000, 00:00:00 AM'
  let title = postData?.Title ? postData?.Title : ''
  let descript = postData?.Description ? postData?.Description : ''
  let labelCount = 0

  let databaseTarget = 'Comment'
  let targetUUID = null

  const mockTags = postData?.TagID ? postData?.TagID : ['']
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
                    className="d-inline-block mr-2 rounded-lg hover-darken-2"
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
                <div className="cursor-pointer d-flex">
                  <img className="style8 d-inline-block mx-2" src={user_icon} />{' '}
                  <p
                    className="textPostStyle h4 font-weight-bold d-inline-vlock mt-1"
                    id={'Popover-' + labelCount}
                  >
                    {postOwner}
                  </p>
                  <PopoverItem
                    key={labelCount}
                    item={{
                      placement: 'button',
                      text: infoData,
                      className:
                        'textPostStyle h4 font-weight-bold d-inline-vlock mt-1',
                    }}
                    id={genLoadLabel()}
                  />
                </div>
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
                  className="style13 mr-4 mb-4 hover-darken cursor-pointer"
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
                      .{extFile}
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
                    className="mr-2 cursor-pointer hover-darken-2"
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
            {/* load comment */}
            {infocommentData &&
            commentData &&
            commentData?.length &&
            infocommentData?.length == commentData?.length ? (
              infocommentData.map((infoComment, index) => (
                <div className="style21 d-block bg-white mx-auto w-100 p-4 mb-3">
                  <div className="w-content d-flex justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      style={{ width: '72.5%' }}
                    >
                      <p
                        className="style22 text-break pl-3"
                        hidden={editCommentBlock == index}
                      >
                        {commentData[index][1]?.Description}
                      </p>

                      {editCommentBlock == index ? (
                        renderEditBlock(commentData[index])
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="d-flex pl-4" style={{ width: '22.5%' }}>
                      <div
                        className=" d-inline-block"
                        style={{ verticalAlign: 'top' }}
                      >
                        <img className="style23 mr-3" src={userIcon} />
                      </div>
                      <div className="d-inline-block" style={{ width: '70%' }}>
                        <p className="h6 d-inline-block mr-1 my-0">by</p>
                        <p
                          className="style25 d-inline-flex text-truncate my-0 cursor-pointer"
                          ata-toggle="tooltip"
                          data-placement="left"
                          title={
                            infoComment?.DisplayName +
                            ' (Click for more details)'
                          }
                          id={'Popover-' + labelCount}
                          style={{ width: '80%', maxWidth: '120px' }}
                        >
                          {infoComment?.DisplayName}
                        </p>

                        <PopoverItem
                          key={labelCount}
                          item={{
                            placement: 'top',
                            text: infoComment,
                            className:
                              'style25 d-inline-flex text-truncate font-weight-bold my-0 cursor-pointer p-0',
                          }}
                          id={genLoadLabel()}
                        />

                        <div className="style24 d-block text-truncate">
                          {convertTStoDate(commentData[index][1]?.DateCreate)}
                        </div>
                        {commentData[index][1]?.DateCreate !=
                          commentData[index][1]?.DateEdited && (
                          <div className="style24 d-block text-truncate">
                            Edited
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="p-0 m-0 max-w-content"
                      style={{ width: '5%' }}
                    >
                      <Button
                        className="rounded-circle m-0 p-2 hover-darken"
                        id={'Popover-' + labelCount}
                      >
                        <MoreLabel />
                      </Button>
                      <MoreItem
                        key={labelCount}
                        item={{
                          placement: 'top',
                          user: infoComment,
                          data: commentData[index],
                          className:
                            'style25 d-inline-flex text-truncate font-weight-bold my-0 cursor-pointer p-0',
                        }}
                        id={genLoadLabel()}
                      />
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
              value={commentDescription}
              onChange={(e) => setCommentDescription(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => handleOnAddComment(commentDescription)}
              className="style28 btn btn-primary btn-sm px-3 border-0"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0 10px 10px 0',
              }}
            >
              <img className="style29" src={sendArrow} />
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
                  {commentData[index][1].Description}
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
                    &nbsp;&nbsp;{convertTStoDate(commentData[index][1].DateEdited)}
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
