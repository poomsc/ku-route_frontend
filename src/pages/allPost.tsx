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
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import filepdf1 from '../Data/pdf1'
import PDF from '../assets/icons/PDF.png'
import { useEffect, useState } from 'react'
import { DocumentData, serverTimestamp } from '@firebase/firestore'
import { BasicSearch } from 'service/search'
import { stringify } from 'querystring'
import applicationStore from 'stores/applicationStore'
import React from 'react'
import { useHistory } from 'react-router'
import { height } from '@mui/system'

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

  const currentSearch = localStorage.getItem('currentSearch')
  const SubjectIDandTH = currentSearch
    ? currentSearch.split(' ')
    : [' ', 'ชื่อวิชา่']
  const SubjectENG = currentSearch
    ? currentSearch.split('(')[1].replace(')', '')
    : 'SubjectName'

  const handleOnViewPage = (PostID: string) => {
    localStorage.setItem('currentViewPost', PostID)
    history.push('/post')
  }

  function renderPost(menu, index, col) {
    const PostID = menu[0]
    countPostColumn[col]++

    if (countPostColumn[col] % 2 == col) {
      return (
        <div className="w-content d-flex mb-4" key={index}>
          <Container className="w-content d-inline-block p-0">
            <div className="row m-0 p-0 d-inline w-25">
              <div className="form py-4">
                <tr className="TAG d-block w-content my-1 mx-2 mb-3">
                  {menu[1].TagID.map((tag, idx) => (
                    <div
                      className="max-w-content d-inline-block rounded cursor-pointer px-2 py-1 ml-3 "
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
                </tr>

                <div className="title text-truncate mx-3 px-2 mt-4 my-2">
                  {menu[1].Title}
                </div>
                <div className="mx-3 px-2 mb-4">
                  <img className="line-black w-100" src={lineblack} />
                </div>
                <div
                  className="headtext text-truncate mx-3 mt-3 px-2 my-3"
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

                <div className="pdfrow mx-3 px-2 my-2 py-2">
                  <div className="d-flex align-content-start flex-wrap">
                    {filepdf1.map((pdftest, AAA) => {
                      return (
                        <div className="">
                          <Link
                            to={pdftest.path}
                            className="pdfcount d-inline-block"
                          >
                            <img className="pdf" src={PDF} />
                            <div
                              className="text-center text-truncate mr-1"
                              style={{ maxWidth: '50px' }}
                            >
                              {pdftest.name}
                            </div>
                          </Link>
                        </div>
                      )
                    })}
                    <div
                      className="pdfcount cursor-pointer d-inline-block"
                      onClick={() => handleOnViewPage(PostID)}
                    >
                      <img className="moreItem" src={moreitem} />
                      <div className="textmore">MoreItem</div>
                    </div>
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
                  <div className="Time mx-3 px-2 pt-3 text-center">
                    {'Posted ' + convertTStoDate(menu[1].DateEdited)}
                  </div>
                </tr>
              </div>
            </div>
          </Container>
        </div>
      )
    }
  }

  useEffect(() => {
    async function fetch() {
      if (!currentSearch) return
      const result = await BasicSearch(SubjectIDandTH[0], [])
      setResultPost(result)
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
            {/* <tr className="post-picture">
                <th>
                  <img className="pic" src={write_pic} />
                  <span className="count">{resultPost?.length}</span>
                </th>
              </tr> */}
            <div
              className="Subjectnum d-inline-block"
              style={{ width: '35%', maxWidth: '350px', verticalAlign: 'top' }}
            >
              <div className="d-flex justify-content-end pb-1">
                {/* <div>
                  <div className="d-flex flex-row-reverse align-items-end mt-5 pt-2 mr-4">
                    <div className=""> ลุงพล1</div>
                    <div className=""> ลุงพล2</div>
                    <div className=""> ลุงพล3</div>
                  </div>
                  <div className="d-flex justify-content-end mr-4">
                    กินข้าว
                  </div>
                </div> */}
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

          <div className="my-5 d-block"></div>

          <div className="w-content d-flex justify-content-between">
            <div
              className="left w-content d-inline-block pt-3 ml-4"
              style={{ verticalAlign: 'top' }}
            >
              {resultPost?.map((menu, index) => renderPost(menu, index, 0))}
            </div>

            <div
              className="right w-content d-inline-block pt-3 mr-4"
              style={{ verticalAlign: 'top' }}
            >
              {resultPost?.map((menu, index) => renderPost(menu, index, 1))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPostPage
