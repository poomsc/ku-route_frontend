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

function convertTStoDate(timestamp) {
  const timeCurrent = new Date().getTime() / 1000
  const timeDiff = timeCurrent - timestamp.seconds
  console.log(timeCurrent)
  console.log(timestamp)

  if(timeDiff < 60) //second
    return timeDiff.toString() + 's'
  else if(timeDiff < 3600) { //minute
    const minute = Math.floor(timeDiff / 60)
    return minute.toString() + 'm'
  }
  else if(timeDiff < 86400) { //hour
    const hour = Math.floor(timeDiff / 3600)
    return hour.toString() + 'h'
  }
  else
    return new Date(timestamp)
}

const AllPostPage = () => {
  const [resultPost, setResultPost] = useState<DocumentData>()

  useEffect(() => {
    async function fetch() {
      const result = await BasicSearch('02743552-60 นิติการบัญชีและการเงิน', [])
      setResultPost(result)
    }
    fetch()
  }, [])


  return (
    <div className="Component">
      {resultPost?.map((menu, index) => {
        return (
          <div className="container" key={index}>
            <Container>
              <thead>
                <div className="Subject">
                  <div>{menu.SubjectEng}</div>
                  <div>{menu.SubjectID.split(' ')[1]}</div>
                </div>
                <tr className="post-picture">
                  <th>
                    <img className="pic" src={write_pic} />
                    <span className="count">{resultPost.length}</span>
                  </th>
                </tr>
                <div className="all">
                  <>{menu.Allpost}</>
                  <span className="textpost">POSTS</span>
                </div>
                <div className="Subjectnum">
                  <div>หมวดวิชาแกน</div>
                  <div className="textcode">{menu.SubjectID.split(' ')[0]}</div>
                </div>
              </thead>
              <img className="line-white" src={linewhite} />
              <div className="row">
                <div className="col-4">
                  <div className="form">
                    <tr>
                      <th className="category">{menu.Category}</th>
                    </tr>
                    <div className="title">{menu.Title}</div>
                    <img className="line-black" src={lineblack} />
                    <div className="headtext">{menu.Description}</div>
                    <tr className="pdfrow">
                      {filepdf1.map((pdftest, AAA) => {
                        return (
                          <Link to={pdftest.path} className="pdfcount">
                            <img className="pdf" src={pdf} />
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
                <div className="col-4">
                  <div className="form">
                    <tr>
                      <th className="category">{menu.Category}</th>
                    </tr>
                    <div className="title">{menu.title}</div>
                    <img className="line-black" src={lineblack} />
                    <div className="headtext">{menu.headtext}</div>
                    <tr className="pdfrow">
                      {filepdf1.map((pdftest, AAA) => {
                        return (
                          <Link to={pdftest.path} className="pdfcount">
                            <img className="pdf" src={pdf} />
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
                        <div>{menu.Time}</div>
                      </th>
                    </tr>
                  </div>
                </div>
                <div className="col-4"> </div>
                <div> </div>
                <div className="col-4">
                  <div className="form">
                    <tr>
                      <th className="category">{menu.Category}</th>
                    </tr>
                    <div className="title">{menu.title}</div>
                    <img className="line-black" src={lineblack} />
                    <div className="headtext">{menu.headtext}</div>
                    <tr className="pdfrow">
                      {filepdf1.map((pdftest, AAA) => {
                        return (
                          <Link to={pdftest.path} className="pdfcount">
                            <img className="pdf" src={pdf} />
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
                        <div>{menu.Time}</div>
                      </th>
                    </tr>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form">
                    <tr>
                      <th className="category">{menu.Category}</th>
                    </tr>
                    <div className="title">{menu.title}</div>
                    <img className="line-black" src={lineblack} />
                    <div className="headtext">{menu.headtext}</div>
                    <tr className="pdfrow">
                      {filepdf1.map((pdftest, AAA) => {
                        return (
                          <Link to={pdftest.path} className="pdfcount">
                            <img className="pdf" src={pdf} />
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
                        <div>{menu.Time}</div>
                      </th>
                    </tr>
                  </div>
                </div>
                <div className="col-4"> </div>
                <div> </div>
              </div>
            </Container>
          </div>
        )
      })}
    </div>
  )
}

export default AllPostPage
