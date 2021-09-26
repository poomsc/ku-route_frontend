import React from 'react'
import '../Post.css'
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
import { DocumentData } from '@firebase/firestore'
import {
  get_comment,
  get_file,
  get_info,
  get_info_comment,
  get_one_post,
} from 'service/system'

const PostPage = () => {
  const [postData, setPostData] = useState<DocumentData>()
  const [infoData, setInfoData] = useState<DocumentData>()
  const [commentData, setCommentData] = useState<DocumentData>()
  const [infocommentData, setInfoCommentData] = useState<DocumentData>()

  useEffect(() => {
    async function fetch() {
      const post = (await get_one_post('x6XyIHVqD9BVslonhypR')) as DocumentData
      const info = (await get_info(post?.AccountID)) as DocumentData
      const comment = (await get_comment(
        'x6XyIHVqD9BVslonhypR'
      )) as DocumentData
      const info_comment = (await get_info_comment(
        'x6XyIHVqD9BVslonhypR'
      )) as Array<string>

      setPostData(post)
      setInfoData(info)
      setCommentData(comment)
      setInfoCommentData(info_comment)
    }
    fetch()
  }, [])

  console.log(infocommentData)
  const mockFiles = [
    ['สรุปบทที่ 1.pdf', '23.40 MB'],
    ['สรุปบทที่ 2.pdf', '4.70 MB'],
    ['สรุปบทที่ 3.pdf', '5.20 MB'],
    ['สรุปแถม.jpg', '2.70 MB'],
  ]
  let postOwner = infoData?.DisplayName ? infoData?.DisplayName : ''
  let datePosted = '05/06/2564'
  let title = postData?.Title ? postData?.Title : ''
  let descript = postData?.Description ? postData?.Description : ''
  const mockTags = postData?.TagID ? postData?.TagID : ['']
  const mockSubjectName = ['01204241', 'Software Engineer']
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

  //let mockComment = []
  if (infocommentData && commentData) {
  }
  const mockComment = [
    ['ขอบคุณที่แชร์ครับ ^_^', 'MAMMOTH123', '1'],
    ['พอจะมีของวิชา Digital Design มั้ยครับ', 'XanXiah', '2'],
    ['ขอด้วยคนคร้าบบ', 'Max', '2'],
  ]
  const [allComment, setAllComment] =
    useState<(string | number)[][]>(mockComment)

  const maxColor = colors.length
  return (
    <div className="white-bg" style={{ paddingTop: '90px' }}>
      <Container
        className="box-shadow bg-white mx-auto mb-5"
        style={{
          height: '350px',
          left: '157px',
          top: '190px',
          width: '1126px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',
        }}
      >
        <div className="">
          <div
            className="d-inline-flex pl-3"
            style={{
              height: '32px',
              top: '228px',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
          >
            {mockTags.map((tag, idx) => (
              <div
                className="max-w-content cursor-pointer align-self-center px-3 pt-1 ml-3 "
                key={tag}
                style={{
                  backgroundColor: colors[maxColor - (idx % maxColor) - 1],
                  color: '#FFFFFF',
                  top: '233px',
                  fontSize: '18px',
                  lineHeight: '21px',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  borderRadius: '5px',
                  marginTop: '75px',
                }}
              >
                <div
                  className=""
                  style={{
                    width: '91px',
                    height: '25px',
                    left: '222px',
                    top: '233px',
                    fontSize: '18px',
                    lineHeight: '21px',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    marginTop: '3px',
                  }}
                >
                  {tag}
                </div>
              </div>
            ))}
          </div>
          <div
            className="float-right "
            style={{
              height: '80px',
              color: '#02353C',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
              lineHeight: '21px',
              textAlign: 'right',
              marginTop: '15px',
            }}
          >
            {mockSubjectName[0]} | {mockSubjectName[1]}
          </div>
        </div>
        <h2
          className="d-flex pt-4"
          style={{
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            display: 'flex',
            alignItems: 'center',
            fontSize: '48px',
            lineHeight: '56px',
            color: '#525252',
            left: '208px',
            top: '273px',
            paddingLeft: '25px',
          }}
        >
          {title}
        </h2>
        <div>
          <div
            className="d-flex d-inline-flex"
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              lineHeight: '28px',
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#525252',
              height: '70px',
              alignItems: 'center',
              paddingLeft: '25px',
              paddingBottom: '15px',
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
            className="float-right mt-4"
            style={{
              fontSize: '18px',
              lineHeight: '11px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#000000',
              textAlign: 'right',
              height: '37px',
              top: '416px',
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
            fontSize: '24px',
            lineHeight: '28px',
          }}
        >
          {descript}
        </div>
      </Container>

      <Container
        className="box-shadow bg-white mx-auto mb-4 px-5 pt-4"
        style={{
          borderRadius: '20px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          background: 'rgba(255, 255, 255, 0.5)',
          width: '1126px',
          height: '308px',
        }}
      >
        <h5
          className="py-4 px-2"
          style={{
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontSize: '24px',
            lineHeight: '28px',
            color: '#525252',
          }}
        >
          ไฟล์ที่แนบมาด้วย
        </h5>
        <div className="d-flex pb-4 px-3 mb-5">
          {allFile.map((file) => (
            <div
              className="mr-2 ml-4 mb-4"
              style={{
                border: '1px solid #BFBFBF ',
                background: '#FAFAFA',
                borderRadius: '10px',
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

      <Container
        className="box-shadow bg-white mx-auto mb-4 px-0 pt-4"
        style={{
          width: '1200px',
          height: '310px',
          left: '157px',
          top: '1017px',
          borderRadius: '5px 5px 5px 5px',
        }}
      >
        <div
          style={{
            paddingLeft: '3vw',
            paddingRight: '3vw',
            marginBottom: '30px',
            lineHeight: '38px',
            height: '35px',
          }}
        >
          <div
            className="d-flex pl-3 pb-2 d-inline-flex"
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontSize: '25px',
              fontWeight: 'bold',
              color: '#525252',
            }}
          >
            การตอบกลับ
          </div>
          <div
            className="float-right mt-0 "
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#2EAF7D',
              paddingRight: '0vw',
            }}
          >
            &nbsp;&nbsp;7&nbsp;&nbsp;
          </div>
          <img
            className="float-right mt-2"
            style={{
              width: '20px',
              height: '20px',
            }}
            src={Like}
          />
          <div
            className="float-right mt-0 "
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#3FD0C9',
              paddingRight: '0vw',
            }}
          >
            &nbsp;&nbsp;6&nbsp;&nbsp;
          </div>
          <img
            className="float-right mt-2"
            style={{
              width: '20px',
              height: '20px',
            }}
            src={Comment}
          />
        </div>

        {allComment.map((comment) => (
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
                {comment[0]}
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
                  &nbsp;&nbsp;{comment[2]}&nbsp;&nbsp;&nbsp;&nbsp;
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
                  {comment[1]}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="d-block mx-auto px-5 py-3"
          style={{
            width: '1140px',
            height: '60px',
            top: '1017px',
            borderRadius: '0rem 0rem 5px 5px',
            background: '#D9D9D9',
            margin: '0px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="form-group shadow d-flex">
            <input
              style={{
                borderRadius: '4px 0px 0px 4px',
                background: '#FFFFFF',
                border: 'none',
                width: '1160px',
              }}
              type="text"
              className="form-control"
              placeholder="ตอบกลับโพสต์นี้..."
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: '0px 4px 4px 0px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                height: '33px',
              }}
            >
              <img
                style={{
                  width: '15px',
                  height: '15px',
                  background: '#FFFFFF',
                  borderRadius: '0px 4px 4px 0px',
                  border: 'none',
                }}
                src={sendArrow}
              />
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PostPage
