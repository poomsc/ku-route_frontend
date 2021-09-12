import React from 'react'
import '../Post.css'
import { Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import user_icon from './../assets/icons/user-icon.png'
import { url } from 'inspector'
import pdf from './../assets/icons/PDF.png'
import jpg from './../assets/icons/JPG.png'

const PostPage = () => {
  const mockTags = ['คลังหนังสือ', 'ชีทสรุป']
  const mockFiles = [
    ['สรุปบทที่ 1.pdf', '23.40 MB'],
    ['สรุปบทที่ 2.pdf', '4.70 MB'],
    ['สรุปบทที่ 3.pdf', '5.20 MB'],
    ['สรุปแถม.jpg', '2.70 MB'],
  ]
  let postOwner = 'Traiman Hansa'
  let datePosted = '05/06/2564'
  let title = 'แจกไฟล์สรุป midterm วิชา Software Engineering'
  let descript =
    'แจกสรุป วิชา Software Engineer (01204241) สำหรับ midterm  ดาวน์โหลดได้ที่ไฟล์ด้านล่างนี้ถ้าตกหล่นตรงไหนมาแชร์กันได้ครับ'
  const mockSubjectName = ['01204241', 'Software Engineer']
  const [allTag, setAllTag] = useState<string[]>(mockTags)
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
  const maxColor = colors.length
  return (
    <div className="white-bg py-5">
      <Container className="rounded box-shadow bg-white mx-auto mb-4">
        <div className="">
          <div className="d-inline-flex">
            {allTag.map((tag, idx) => (
              <div
                className="max-w-content rounded cursor-pointer align-self-center px-2 py-1  ml-3 my-2"
                key={tag}
                style={{
                  backgroundColor: colors[maxColor - (idx % maxColor) - 1],
                  color: '#FFFFFF',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div
            className="float-right my-4"
            style={{
              color: '#02353C',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {mockSubjectName[0]} | {mockSubjectName[1]}
          </div>
        </div>
        <h2
          className="d-flex px-3 pb-2"
          style={{
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            display: 'flex',
            alignItems: 'center',
            fontSize: '48px',
            color: '#525252',
          }}
        >
          {title}
        </h2>
        <div>
          <div
            className="d-flex pl-3 pb-2 d-inline-flex"
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#525252',
            }}
          >
            โพสต์โดย &nbsp;{' '}
            <img
              src={user_icon}
              className="mt-0"
              style={{
                padding: '2px',
                background: '#E4E6E7',
                width: '25px',
                height: '25px',
                borderRadius: '50px',
              }}
            />{' '}
            &nbsp;{postOwner}
          </div>
          <div
            className="float-right my-1"
            style={{
              fontSize: '18px',
              lineHeight: '21px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#000000',
            }}
          >
            {datePosted}
          </div>
        </div>
        <div
          className="d-flex py-3 pl-5 pb-5 mb-5"
          style={{
            color: '#525252',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '18px',
          }}
        >
          {descript}
        </div>
      </Container>

      <Container className="rounded box-shadow bg-white mx-auto mb-4 px-5 pt-4">
        <h5
          className="py-4 px-2"
          style={{
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontSize: '25px',
            color: '#525252',
          }}
        >
          ไฟล์ที่แนบมาด้วย
        </h5>
        <div className="d-flex pb-4 px-3">
          {allFile.map((file) => (
            <div
              className="rounded mr-2 ml-4 mb-4"
              style={{
                border: '1px solid #BFBFBF ',
                background: '#FAFAFA',
                borderRadius: '15px',
                boxSizing: 'border-box',
              }}
              key={file[0]}
            >
              <div
                className="d-flex flex-column mb-3"
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  color: '#000000',
                  fontSize: '10px',
                  display: 'flex',
                  lineHeight: '12px',
                  textAlign: 'center',
                }}
              >
                {file[0].split('.')[1] == 'pdf' ? (
                  <div className="d-block mx-auto">
                    {' '}
                    <img
                      src={pdf}
                      style={{ width: '111px', height: '111px' }}
                    />{' '}
                  </div>
                ) : (
                  <div className="d-block mx-auto">
                    <img
                      src={jpg}
                      style={{ width: '111px', height: '111px' }}
                    />{' '}
                  </div>
                )}

                <div className="d-block mx-auto">
                  <div
                    style={{
                      marginBottom: '0px',
                      fontFamily: 'Roboto',
                      fontSize: '13px',
                      lineHeight: '15px',
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                    }}
                  >
                    {file[0]}
                  </div>
                  <br />
                  {file[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="rounded box-shadow bg-white mx-auto px-0">
        <h5 style={{ fontWeight: 'bold' }}>การตอบกลับ</h5>
        <div>ตอบกลับโพสต์นี้</div>
      </Container>
    </div>
  )
}

export default PostPage
