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

let countE = -1
let countF = -1

function convertTStoDate(timestamp) {
  const timeCurrent = new Date().getTime() / 1000
  const timeDiff = timeCurrent - timestamp.seconds
  console.log(timeCurrent)

  if (timeDiff < 60) {
    //second
    const second = Math.floor(timeDiff)
    if (second == 1) return second.toString() + ' second ago'
    return timeDiff.toString() + ' seconds ago'
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
  let countE = -1
  let countF = -1
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
    <div
      className="blue-bg jumbotron jumbotron-fluid mb-0"
      style={{ paddingLeft: '20vw' }}
    >
      <thead>
        <div className="Subject">
          <div className="SubjectENG">{SubjectENG}</div>
          <div className="SubjectTH">{SubjectIDandTH[1]}</div>
        </div>
        {/* <tr className="post-picture">
          <th>
            <img className="pic" src={write_pic} />
            <span className="count">{resultPost?.length}</span>
          </th>
        </tr> */}
        <div className="Subjectnum">
          <div className="textnum">รหัสวิชา</div>
          <div className="textcode">{SubjectIDandTH[0]}</div>
        </div>
      </thead>
      <img className="line-white" src={linewhite} />
      <div className="my-5 d-block"></div>
      <div className="w-75" style={{ paddingLeft: '5rem', minWidth: "1000px"}}>
        <div
          className="left w-content d-inline-block  p-3"
          style={{ verticalAlign: 'top' }}
        >
          {resultPost?.map((menu, index) => {
            const PostID = menu[0]
            let text = menu[1].Title
            if (text.length > 28) {
              text = text.substring(0, 29) + '...'
            }
            let descrip = menu[1].Description
            if (descrip?.length > 35) {
              descrip = descrip.substring(0, 36) + '...'
            }
            countE = countE + 1
            if (countE % 2 == 0) {
              return (
                <div className="w-content d-flex mb-5" key={index}>
                  <Container className="w-content d-inline-block">
                    <div className="row m-0 p-0 d-inline w-25">
                      <div className="col-4 d-inline-block">
                        <div className="form">
                          <tr className="TAG">
                            {menu[1].TagID.map((tag, idx) => (
                              <div
                                className=" max-w-content rounded cursor-pointer  px-2 py-1  ml-3 "
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
                          <div className="title mr-3">{text}</div>
                          <img className="line-black" src={lineblack} />
                          <div className="headtext">{descrip}</div>

                          <tr className="pdfrow">
                            {filepdf1.map((pdftest, AAA) => {
                              return (
                                <Link to={pdftest.path} className="pdfcount">
                                  <img className="pdf" src={PDF} />
                                  <div>{pdftest.name}</div>
                                </Link>
                              )
                            })}
                            <div
                              className="pdfcount cursor-pointer"
                              onClick={() => handleOnViewPage(PostID)}
                            >
                              <img className="moreItem" src={moreitem} />
                              <div className="textmore">MoreItem</div>
                            </div>
                          </tr>
                          <tr>
                            {/* <th className="creatby">
                              <img className="Profile" src={profile} />
                              <span className="Name">{menu.create}</span>
                            </th> */}
                            <th className="Time">
                              <div>
                                {'Posted ' +
                                  convertTStoDate(menu[1].DateEdited)}
                              </div>
                            </th>
                          </tr>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
              )
            }
          })}
        </div>

        <div
<<<<<<< HEAD
          className="right w-content d-inline-block p-3"
          style={{verticalAlign: 'top'}}
=======
          className="right w-50 d-inline-block p-3"
          style={{ verticalAlign: 'top' }}
>>>>>>> 5a8dd1554d3e0c7c9c60fe5647462f04c6b6d3da
        >
          {resultPost?.map((menu, index) => {
            const PostID = menu[0]
            let text = menu[1].Title
            if (text?.length > 28) {
              text = text.substring(0, 29) + '...'
            }
            let descrip = menu[1].Description
            if (descrip.length > 35) {
              descrip = descrip.substring(0, 36) + '...'
            }
            countF = countF + 1
            if (countF % 2 == 1) {
              return (
                <div className="w-content d-flex mb-5" key={index}>
                  <Container className="w-content d-inline-block">
                    <div className="row m-0 p-0 d-inline w-25">
                      <div className="col-4 d-inline-block">
                        <div className="form">
                          <tr className="TAG">
                            {menu[1].TagID.map((tag, idx) => (
                              <div
                                className=" max-w-content rounded cursor-pointer  px-2 py-1  ml-3 "
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
                          <div className="title mr-3">{text}</div>
                          <img className="line-black" src={lineblack} />
                          <div className="headtext">{descrip}</div>

                          <tr className="pdfrow">
                            {filepdf1.map((pdftest, AAA) => {
                              return (
                                <Link to={pdftest.path} className="pdfcount">
                                  <img className="pdf" src={PDF} />
                                  <div>{pdftest.name}</div>
                                </Link>
                              )
                            })}
                            <div
                              className="pdfcount cursor-pointer"
                              onClick={() => handleOnViewPage(PostID)}
                            >
                              <img className="moreItem" src={moreitem} />
                              <div className="textmore">MoreItem</div>
                            </div>
                          </tr>
                          <tr>
                            {/* <th className="creatby">
                              <img className="Profile" src={profile} />
                              <span className="Name">{menu.create}</span>
                            </th> */}
                            <th className="Time">
                              <div>
                                {'Posted ' +
                                  convertTStoDate(menu[1].DateEdited)}
                              </div>
                            </th>
                          </tr>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default AllPostPage
