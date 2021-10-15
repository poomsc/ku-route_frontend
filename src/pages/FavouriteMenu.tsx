import React, { useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo_pdf from '../assets/icons/PDF.png'
import logo_sort from '../assets/icons/dropdownArrow.png'
import logo_image from '../assets/icons/Image.png'
import logo_delete from '../assets/icons/Vector.png'
import '../FavouriteMenu.css'
import applicationStore from 'stores/applicationStore'
import { get_mylikepost, get_one_post } from 'service/system'
import { DocumentData } from '@firebase/firestore'
import { useHistory } from 'react-router'
import { convertTStoDate } from './AllPost'
import { disable } from 'service/user'
import { ModalFavouriteMenu } from 'components/Modal'

const FavouriteMenu = () => {
  const [likepostData, setlikepostData] = useState<DocumentData>([])

  useEffect(() => {
    async function fetch() {
      if (!applicationStore.user) return
      const likepost = (await get_mylikepost(
        applicationStore.user.uid
      )) as DocumentData

      setlikepostData(likepost)
    }
    fetch()
  }, [])

  const history = useHistory()
  const handleOnViewPage = (PostID: string) => {
    //localStorage.setItem('currentViewPost', PostID)
    history.push(`post/${PostID}`)
  }

  const handleOnDelete = async (PostID: string) => {
    applicationStore.setDeletePost(PostID)
    if (!applicationStore.user) return
    const likepost = (await get_mylikepost(
      applicationStore.user.uid
    )) as DocumentData
    console.log(likepost)
    setlikepostData(likepost)
  }

  var InitialSorted = 0
  const [setSortStated, setClick] = useState(InitialSorted)
  const [mockDatas, setData] = useState(likepostData)
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
    <div className="blue-bg hxladpasdsaipaspiapsdiaspdpiasdipasdpiasdpiasdipasdpid">
      <Container className="rounded-10 bg-primary-dark text-white font-weight-bold d-flex">
        <div className="Menutab">
          <Link to="/edit-profile" style={{ color: 'white' }}>
            Edit Profile
          </Link>{' '}
          <br />
          <Link to="/my-post" style={{ color: 'white' }}>
            My Posts
          </Link>{' '}
          <br />
          <Link to="/favourite-post" style={{ color: 'white' }}>
            Favourite
          </Link>
          {/* <div className="Menu2">
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
          </div> */}
        </div>
        <Container className="white-bg d-flex">
          <div className="Info">
            <h1 style={{ color: 'black' }}>โพสที่ถูกใจ </h1>
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

              {likepostData.map((object, idx) => {
                if (!object) return
                return (
                  <tr>
                    <td>{object[1]?.SubjectID}</td>
                    <td>{object[1]?.Title}</td>
                    <td>
                      {object[1]?.Description.length > 40
                        ? object[1]?.Description.substring(0, 40) + '...'
                        : object[1]?.Description}
                    </td>
                    <td>
                      <img
                        src={logo_pdf}
                        style={{ padding: '2px' }}
                        width="24px"
                        height="24px"
                      />
                      {/* {object.NumFile[0]} */}
                      <img
                        src={logo_image}
                        style={{ padding: '2px' }}
                        width="24px"
                        height="24px"
                      />
                      {/* {object.NumFile[1]} */}
                    </td>
                    <td>{convertTStoDate(object[1]?.DateEdited)}</td>
                    <td>
                      <div
                        onClick={() => handleOnViewPage(object[0])}
                        className="viewbutton max-w-content d-inline-block cursor-pointer"
                      >
                        VIEW
                      </div>
                      <ModalFavouriteMenu
                        PostID={object[0]}
                        onClick={handleOnDelete}
                      />
                    </td>
                  </tr>
                )
              })}
            </div>
          </div>
        </Container>
      </Container>
    </div>
  )
}

export default FavouriteMenu
