import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo_pdf from '../assets/icons/PDF.png'
import logo_sort from '../assets/icons/Vector (2).png'
import logo_image from '../assets/icons/Image.png'
import logo_delete from '../assets/icons/Vector.png'
import '../FavouriteMenu.css'
const FavouriteMenu = () => {
  var InitialSorted = 0
  const InitialmockDatas = [
    {
      PostID: 'AX01749',
      Title: 'แจกสรุป Math',
      Description: 'ไฟล์แนบมีทั้งหมดสามส่วน',
      NumFile: ['2', '1'],
      Time: '1',
    },
    {
      PostID: 'AB01864',
      Title: 'แจกสรุป Physics',
      Description: 'ไฟล์แนบมีสามส่วน',
      NumFile: ['1', '2'],
      Time: '2',
    },
  ]
  const [setSortStated, setClick] = useState(InitialSorted)
  const [mockDatas, setData] = useState(InitialmockDatas)
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
            <h1 style={{ color: 'black' }}>โพสที่ถูกใจ </h1>
            <div className="table">
              <thead>
                <tr>
                  <th scope="col">ไอดี</th>
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

              {mockDatas.map((object, idx) => (
                <tr>
                  <td>{object.PostID}</td>
                  <td>{object.Title}</td>
                  <td>{object.Description}</td>
                  <td>
                    <img
                      src={logo_pdf}
                      style={{ padding: '2px' }}
                      width="24px"
                      height="24px"
                    />
                    {object.NumFile[0]}
                    <img
                      src={logo_image}
                      style={{ padding: '2px' }}
                      width="24px"
                      height="24px"
                    />
                    {object.NumFile[1]}
                  </td>
                  <td>{object.Time}</td>
                  <td>
                    <Link to="/" className="viewbutton">
                      VIEW
                    </Link>
                    <Link to="/" className="removebutton">
                      REMOVE
                    </Link>
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

export default FavouriteMenu
