import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../EditPostMenu.css'
import logo_pdf from '../assets/icons/PDF.png'
import logo_sort from '../assets/icons/dropdownArrow.png'
import logo_image from '../assets/icons/Image.png'
import logo_delete from '../assets/icons/Vector.png'
import logo_fix from '../assets/icons/fix.png'
import { DocumentData } from '@firebase/firestore'
import applicationStore from 'stores/applicationStore'
import { get_my_post, get_one_post } from 'service/system'
import { convertTStoDate } from './AllPost'
import { useHistory } from 'react-router'
import { disable } from 'service/user'

const EditPostMenu = () => {
  const [mypostData, setmypostData] = useState<DocumentData>([])

  useEffect(() => {
    async function fetch() {
      if (!applicationStore.user) return
      const mypost = (await get_my_post(
        applicationStore.user.uid
      )) as DocumentData

      // const MyPost = [] as any
      // mypost?.forEach((post) => {
      //   MyPost.push(post)
      // })

      setmypostData(mypost)
    }
    fetch()
  }, [])

  // console.log(mypostData)

  const history = useHistory()
  const handleOnViewPage = (PostID: string) => {
    localStorage.setItem('currentViewPost', PostID)
    history.push('/post')
  }

  const handelOnDelete = async (PostID: string) => {
    disable({}, PostID, 'Post')
    if (!applicationStore.user) return
    const mypost = (await get_my_post(
      applicationStore.user.uid
    )) as DocumentData
    setmypostData(mypost)
  }

  var InitialSorted = 0
  const [setSortStated, setClick] = useState(InitialSorted)
  const [mockDatas, setData] = useState(mypostData)
  const handleOnClick = () => {
    if (setSortStated === 1) {
      setClick(0)
      setData(
        mockDatas.sort((a, b) =>
          a.Time > b.Time ? -1 : b.Time > a.Time ? 1 : 0
        )
      )
    } else {
      setClick(1)
      setData(
        mockDatas.sort((a, b) =>
          a.Time < b.Time ? -1 : b.Time < a.Time ? 1 : 0
        )
      )
    }
  }

  return (
    <div className="blue-bg">
      <Container className="rounded-10 bg-primary-dark text-white font-weight-bold d-flex">
        <div className="Menutab">
          <Link to="/" style={{ color: 'white' }}>
            Edit Profile
          </Link>{' '}
          <br />
          <Link to="/" style={{ color: 'white' }}>
            My Posts
          </Link>{' '}
          <br />
          <Link to="/" style={{ color: 'white' }}>
            Favourite
          </Link>
          <div className="Menu2">
            <Link to="/" style={{ color: 'white' }}>
              About us
            </Link>{' '}
            <br />
            <Link to="/" style={{ color: 'white' }}>
              Contact
            </Link>{' '}
            <br />
            <Link to="/" style={{ color: 'white' }}>
              Help
            </Link>{' '}
            <br />
            <Link to="/" style={{ color: 'white' }}>
              FAQs
            </Link>
          </div>
        </div>
        <Container className="white-bg">
          <div className="Info">
            <h1 style={{ color: 'black' }}>ประวัติการอัพโหลด </h1>
            <div className="table">
              <thead>
                <tr>
                  <th scope="col">รหัสวิชา</th>
                  <th scope="col">หัวเรื่อง</th>
                  <th scope="col">ข้อความ</th>
                  <th scope="col">ไฟล์แนบ</th>
                  <th scope="col">เวลา</th>
                  <th>
                    <img
                      src={logo_sort}
                      width="10.5px"
                      height="7px"
                      onClick={() => handleOnClick()}
                    />
                    <> sort by date</>
                  </th>
                </tr>
              </thead>

              {mypostData.map((object, idx) => (
                <tr>
                  <td>{object[1]?.SubjectID}</td>
                  <td>{object[1]?.Title}</td>
                  <td>{object[1]?.Description}</td>
                  <td>
                    <img
                      src={logo_pdf}
                      style={{ padding: '2px' }}
                      width="24px"
                      height="24px"
                    />
                    {/* {object?.NumFile[0]} */}
                    <img
                      src={logo_image}
                      style={{ padding: '2px' }}
                      width="24px"
                      height="24px"
                    />
                    {/* {object?.NumFile[1]} */}
                  </td>
                  <td>{convertTStoDate(object[1]?.DateEdited)}</td>
                  <td>
                    <div
                      onClick={() => handleOnViewPage(object[0])}
                      className="fixbutton max-w-content d-inline-block cursor-pointer"
                    >
                      แก้ไข
                    </div>
                    <div
                      onClick={() => handelOnDelete(object[0])}
                      className="deletebutton max-w-content d-inline-block cursor-pointer"
                    >
                      <img src={logo_delete} width="8px" height="10px" />
                    </div>
                  </td>
                </tr>
              ))}
            </div>
          </div>
        </Container>
      </Container>
    </div>
  )
}

export default EditPostMenu
