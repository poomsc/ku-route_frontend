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

function convertTStoDate(timestamp) {
  const timeCurrent = new Date().getTime() / 1000
  const timeDiff = timeCurrent - timestamp.seconds
  console.log(timeCurrent)
  console.log(timestamp)

  if (timeDiff < 60)
    //second
    return timeDiff.toString() + 's'
  else if (timeDiff < 3600) {
    //minute
    const minute = Math.floor(timeDiff / 60)
    return minute.toString() + 'm'
  } else if (timeDiff < 86400) {
    //hour
    const hour = Math.floor(timeDiff / 3600)
    return hour.toString() + 'h'
  } else return new Date(timestamp)
}

const AllPostPage = () => {
  const [resultPost, setResultPost] = useState<DocumentData>()

  useEffect(() => {
    async function fetch() {
      const result = await BasicSearch(applicationStore.subjectID, [])
      setResultPost(result)
    }
    fetch()
  }, [applicationStore.subjectID])

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
    <div className="blue-bg jumbotron jumbotron-fluid mb-0" style={{ paddingLeft: '15vw' }}>
      <thead>
        <div className="Subject">
          <div>{applicationStore.subjectENG}</div>
          <div>{applicationStore.subjectTH}</div>
        </div>
        <tr className="post-picture">
          <th>
            <img className="pic" src={write_pic} />
            <span className="count">{resultPost?.length}</span>
          </th>
        </tr>
        <div className="Subjectnum">
          <div className="textnum">รหัสวิชา</div>
          <div className="textcode">{applicationStore.subjectID}</div>
        </div>
      </thead>
      <img className="line-white" src={linewhite} />     
      {resultPost?.map((menu, index) => {
        return (
          <div className="container" key={index}> 
            <Container>             
              <div className="row">
                <div className="col-4">
                  <div className="form">
                    <tr className="TAG">
                      {menu.TagID.map((tag, idx) => (
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
                    <div className="title">{menu.Title}</div>
                    <img className="line-black" src={lineblack} />
                    <div className="headtext">
                      ใครสนใจเข้ามาดาวน์โหลดได้ที่โพสนี้
                    </div>

                    <tr className="pdfrow">
                      {filepdf1.map((pdftest, AAA) => {
                        return (
                          <Link to={pdftest.path} className="pdfcount">
                            <img className="pdf" src={PDF} />
                            <div>{pdftest.name}</div>
                          </Link>
                        )
                      })}
                      <Link to="/pdf1" className="pdfcount">
                        <img className="moreItem" src={moreitem} />
                        <div className="textmore">MoreItem</div>
                      </Link>
                    </tr>
                    <tr>
                      <th className="creatby">
                        <img className="Profile" src={profile} />
                        <span className="Name">{menu.create}</span>
                      </th>
                      <th className="Time">
                        <div>{convertTStoDate(menu.DateEdited)}</div>
                      </th>
                    </tr>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )
      })}
    </div>
  )
}

export default AllPostPage
