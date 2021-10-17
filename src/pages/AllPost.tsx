import { Link } from 'react-router-dom'
import Data from '../Data/Data_pdf'
import '../allPost.css'
import file_pic from '../assets/icons/file-pic.png'
import write_pic from '../assets/icons/Comment.png'
import post_pic from '../assets/icons/post-pic.png'
import pdf from '../assets/icons/post-pic.png'
import profile from '../assets/icons/profile.png'
import linewhite from '../assets/icons/line.png'
import lineblack from '../assets/icons/lineback.png'
import moreitem from '../assets/icons/more.png'
import { Container, Card, Row, Col, Button, Form } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import filepdf1 from '../Data/pdf1'
import PDF from '../assets/icons/PDF.png'
import JPG from './../assets/icons/JPG.png'
import { useEffect, useState } from 'react'
import { DocumentData, serverTimestamp } from '@firebase/firestore'
import { DateSearch } from 'service/search'
import { stringify } from 'querystring'
import applicationStore from 'stores/applicationStore'
import React from 'react'
import { useHistory } from 'react-router'
import { height } from '@mui/system'
import { get4File, get_info } from 'service/system'

export function convertTStoDate(timestamp) {
  if (!timestamp) return
  const timeCurrent = new Date().getTime() / 1000
  const timeDiff = timeCurrent - timestamp.seconds

  if (timeDiff < 60) {
    //second
    const second = Math.floor(timeDiff)
    if (second == 1) return second.toString() + ' second ago'
    return second.toString() + ' seconds ago'
  } else if (timeDiff < 3600) {
    //minute
    const minute = Math.floor(timeDiff / 60)
    if (minute == 1) return minute.toString() + ' minute ago'
    return minute.toString() + ' minutes ago'
  } else if (timeDiff < 86400) {
    //hour
    const hour = Math.floor(timeDiff / 3600)
    if (hour == 1) return hour.toString() + ' hour ago'
    return hour.toString() + ' hours ago'
  } else {
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleString().split(',')[0]
  }
}

const AllPostPage = () => {
  let countPostColumn = [-1, -1]

  const history = useHistory()
  const [resultPost, setResultPost] = useState<DocumentData>()
  const [fileUrl, setFileUrl] = useState<any>([])
  const [info, setInfo] = useState<DocumentData>([])

  const currentSearch = localStorage.getItem('currentSearch')
  const tagJSON = localStorage.getItem('tagSearch')
  const tagSearch = tagJSON ? JSON.parse(tagJSON) : null
  const SubjectIDandTH = currentSearch
    ? currentSearch.split(' ')
    : [' ', 'ชื่อวิชา่']
  const SubjectENG = currentSearch
    ? currentSearch.split('(')[1].replace(')', '')
    : 'SubjectName'

  const handleOnViewPage = (PostID: string) => {
    history.push(`post/${PostID}`)
  }

  function renderPost(menu, index, col, file, info) {
    const PostID = menu[0]
    countPostColumn[col]++

    if (countPostColumn[col] % 2 == col) {
      return (
        <div
          className="w-content d-flex mb-5"
          key={index}
          //  onMouseEnter={"d"}
          //  onMouseLeave={}
        >
          <Container className="w-content d-inline-block p-0 zoom-1 hover-brighte">
            <div className="row m-0 p-0 d-inline w-25">
              <div
                className="form py-4 cursor-pointer"
                onClick={() => handleOnViewPage(PostID)}
              >
                <div className="row ml-1">
                  <tr className="TAG d-block w-content my-1 mx-2 mb-3">
                    {menu[1].TagID.map((tag, idx) => (
                      <div
                        className="hover-darken-2 max-w-content d-inline-block rounded cursor-pointer px-2 py-1 ml-3 mb-2"
                        key={tag}
                        style={{
                          backgroundColor:
                            colors[maxColor - (idx % maxColor) - 1],
                          color: '#FFFFFF',
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                    {/* <th className="category">{menu.Category}</th> */}
                    {/* <div className ="text-align: right">{SubjectIDandTH[0]}</div>
                    <div className ="text-align: right">
                      {SubjectENG}
                    </div> */}
                  </tr>
                </div>
                <div className="title text-truncate mx-3 px-2 mt-1 my-2">
                  {menu[1].Title}
                </div>
                <div className="row ml-2">
                  <div className="texttitle col-8 ">{SubjectENG}</div>
                  <div className="texttitle col-4 ">{SubjectIDandTH[0]}</div>
                </div>
                <div className="mx-3 px-2 mb-2">
                  <img className="line-black w-100" src={lineblack} />
                </div>
                <div
                  className="headtext text-truncate mx-3 mt-1 px-2 my-2"
                  style={{ height: '41px' }}
                >
                  {menu[1].Description}
                  <p
                    className="font-weight-bold cursor-pointer"
                    onClick={() => handleOnViewPage(PostID)}
                  >
                    {menu[1].Description.length > 40 ? 'ดูเพิ่มเติม...' : null}
                  </p>
                </div>

                <div className="pdfrow mx-3 px-2 mb-2 pb-2">
                  <div className="d-flex align-content-start flex-wrap">
                    {file.map((file, index) => {
                      if (index == 3) return
                      const fileSP = file[1].name.split('.')
                      const extFile =
                        fileSP[fileSP.length - 1] == 'pdf' ? PDF : JPG
                      return (
                        <a
                          className=""
                          key={file[1].name}
                          href={file[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img className="pdf d-inline-block" src={extFile} />
                          <div
                            className="text-center text-truncate mr-1 textmore"
                            style={{ maxWidth: '55px' }}
                          >
                            {file[1].name}
                          </div>
                        </a>
                      )
                    })}
                    {file && file.length > 3 && (
                      <a
                        className="pdfcount cursor-pointer d-inline-block"
                        //onClick={() => handleOnViewPage(PostID)}
                      >
                        <img className="moreItem" src={moreitem} />
                        <div className="textmore">ดูเพิ่มเติม</div>
                      </a>
                    )}
                  </div>
                </div>

                <tr className="d-block">
                  {/* <th className="creatby">
                      <img className="Profile" src={profile} />
                      <span className="Name">{menu.create}</span>
                    </th> */}
                  {/* <div className="aqualine mx-3 mt-4 mb-2"
                         style={{background: "#3fd0c9",
                                 height: "2px"  
                                }}
                    >
                      </div> */}
                </tr>
              </div>
            </div>
            <div
              className="Time text-right"
              style={{
                marginTop: '-32px',
                marginRight: '10px',
              }}
            >
              {'Posted ' + convertTStoDate(menu[1].DateEdited)}
            </div>
          </Container>
        </div>
      )
    }
  }

  const genPageNavigator = () => {
    const a = '<'
    const b = '>'
    const c = 'mr-2 hover-darken-2'
    const s = { width: '40px', backgroundColor: '#FFFFFF' }
    return (
      <div className="d-flex justify-content-center m-4">
        <div className="mr-3">
          <Button className={c} style={s}>
            {a + a}
          </Button>
          <Button className={c} style={s}>
            {a}
          </Button>
        </div>
        <Button className={c} style={s}>
          {a + a}
        </Button>
        <Button className={c} style={s}>
          {a}
        </Button>

        <Button className={c} style={s}>
          1
        </Button>
        <Button className={c} style={s}>
          2
        </Button>
        <Button className={c} style={s}>
          3
        </Button>
        <Button className={c} style={s}>
          ...
        </Button>
        <Button className={c} style={s}>
          150
        </Button>

        <div className="ml-3">
          <Button className={c} style={s}>
            {b}
          </Button>
          <Button className={c} style={s}>
            {b + b}
          </Button>
        </div>
      </div>
    )
  }
  useEffect(() => {
    async function fetch() {
      if (!currentSearch || !tagSearch) return
      const tagResult = [] as Array<string>
      for (const TagID in tagSearch) {
        if (tagSearch[TagID]) tagResult.push(TagID)
      }
      const result = await DateSearch(SubjectIDandTH[0], tagResult, 'desc')
      const fileUrl = await Promise.all(result.map((Post) => get4File(Post[0])))
      const info = await Promise.all(
        result.map((Post) => get_info(Post[1]?.AccountID))
      )
      console.log(fileUrl)
      setResultPost(result)
      setFileUrl(fileUrl)
      setInfo(info)
    }
    fetch()
  }, [currentSearch])

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
    <div className="blue-bg2 jumbotron jumbotron-fluid mb-0">
      <div className="d-inline-block justify-content-center d-flex">
        <div>
          <thead>
            <div
              className="Subject d-inline-block m-0 p-0"
              style={{ width: '65%', maxWidth: '700px' }}
            >
              <div className="SubjectENG max-w-content">{SubjectENG}</div>
              <div className="SubjectTH max-w-content">{SubjectIDandTH[1]}</div>
            </div>
            <div
              className="Subjectnum d-inline-block"
              style={{ width: '35%', maxWidth: '350px', verticalAlign: 'top' }}
            >
              <div className="d-flex justify-content-end pb-1">
                <div>
                  <div className="d-flex flex-row-reverse align-items-end mt-5 pt-2 mr-4">
                    <div className="">
                      <img className="pic my-1" src={write_pic} />
                      <span className="count">{resultPost?.length}</span>
                    </div>
                    <div className=""></div>
                    <div className=""></div>
                  </div>
                  <div className="d-flex justify-content-end mr-4">
                    {/* กินข้าว */}
                  </div>
                </div>
                <div className="mt-3 pb-1">
                  <div className="textnum d-block font-weight-bold pt-1">
                    รหัสวิชา
                  </div>
                  <div className="textcode d-block py-3">
                    {SubjectIDandTH[0]}
                  </div>
                </div>
              </div>
            </div>
            <img className="line-white d-block mt-2" src={linewhite} />
          </thead>

          {genPageNavigator()}
          <div className="my-5 d-block"></div>

          <div className="w-content d-flex justify-content-between">
            <div
              className="left w-content d-inline-block pt-3 ml-4"
              style={{ verticalAlign: 'top' }}
            >
              {resultPost &&
                fileUrl &&
                info &&
                resultPost.length == fileUrl.length &&
                resultPost.length == info.length &&
                resultPost?.map((menu, index) =>
                  renderPost(menu, index, 0, fileUrl[index], info[index])
                )}
            </div>

            <div
              className="right w-content d-inline-block pt-3 mr-4"
              style={{ verticalAlign: 'top' }}
            >
              {resultPost &&
                fileUrl &&
                info &&
                resultPost.length == fileUrl.length &&
                resultPost.length == info.length &&
                resultPost?.map((menu, index) =>
                  renderPost(menu, index, 1, fileUrl[index], info[index])
                )}
            </div>
          </div>
          {genPageNavigator()}
        </div>
      </div>
    </div>
  )
}

export default AllPostPage
