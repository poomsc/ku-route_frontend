import React, { useEffect, useState } from 'react'
import { Jumbotron, Container, Form, Dropdown } from 'react-bootstrap'
import { Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'
import dropdown_arrow from '../assets/icons/dropdownArrow.png'
import 'semantic-ui-css/semantic.min.css'
import Subjects from 'constants/subjects.json'
import { ISubject } from 'interface/subject.interface'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { constTags } from 'constants/index'
import { useHistory, useLocation } from 'react-router'
import applicationStore from 'stores/applicationStore'
import '../App.css'
import lineblack from '../assets/icons/lineback.png'
import moreitem from '../assets/icons/more.png'
import PDF from '../assets/icons/PDF.png'
import JPG from './../assets/icons/JPG.png'
import { get_allpost } from 'service/system'
import { DocumentData } from '@firebase/firestore'
import { get4File, get_info } from 'service/system'
import '../allPost.css'

function convertTStoDate(timestamp) {
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
interface dropdownType {
  text: string
  value: number
}

const HomePage = () => {
  const [fileUrl, setFileUrl] = useState<any>([])
  const [info, setInfo] = useState<DocumentData>([])
  const [statusFilter, setStatusFilter] = useState<any>()

  useEffect(() => {
    const statusFilter = {
      ทั่วไป: false,
      รีวิวรายวิชา: false,
      คลังความรู้: false,
      สรุป: false,
      Lecture: false,
      แบบฝึกหัด: false,
      อื่นๆ: false,
    }
    setStatusFilter(statusFilter)
  }, [])

  const [filter, setFilter] = useState([
    'ทั่วไป',
    'รีวิวรายวิชา',
    'คลังความรู้',
    'สรุป',
    'Lecture',
    'แบบฝึกหัด',
    'อื่นๆ',
  ])

  //const [allFilter, setAllFilter] = useState<string[][]>(mockFilter)

  const _subjects: dropdownType[] = (Subjects as ISubject[]).map((s, i) => {
    return {
      text: `${s.subjectCode} ${s.subjectNameTh} (${s.subjectNameEn})`,
      value: i,
      key: i,
    }
  })

  const [subjectSelected, setSubjectSelected] = useState<string>()
  const history = useHistory()

  const [subjects, setSubjects] = useState<dropdownType[]>(
    _subjects.slice(0, 10)
  )

  const goToAllPost = () => {
    history.push('/all-post')
  }

  const changeStatus = (TagID: string) => {
    statusFilter[TagID] = !statusFilter[TagID]
    console.log(statusFilter)
  }

  const onSearchChange = (event: any) => {
    setSubjects(
      _subjects
        .filter((s) =>
          s.text.toLowerCase().includes(event.target.value.toLowerCase())
        )
        .slice(0, 10)
    )
  }

  const handleOnSelectSubject = (event: any) => {
    setSubjectSelected(event.target.innerText)
    console.log(subjectSelected)
  }

  const handleOnSearch = () => {
    if (!subjectSelected) return
    console.log(subjectSelected)
    const SubjectIDandTH = subjectSelected.split(' ')
    const SubjectENG = subjectSelected.split('(')
    localStorage.setItem('currentSearch', subjectSelected)
    console.log(statusFilter)
    localStorage.setItem('tagSearch', JSON.stringify(statusFilter))
    console.log('Searching... ' + SubjectIDandTH[0])
    goToAllPost()
  }

  const [allpostData, setallpostData] = useState<DocumentData>([])

  useEffect(() => {
    async function fetch() {
      const allpost = (await get_allpost()) as DocumentData
      const fileUrl = await Promise.all(
        allpost.map((Post) => get4File(Post[0]))
      )
      const info = await Promise.all(
        allpost.map((Post) => get_info(Post[1]?.AccountID))
      )
      setallpostData(allpost)
      setFileUrl(fileUrl)
      setInfo(info)
    }
    fetch()
  }, [])
  // console.log(allpostData)

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
          <Container className="w-content d-inline-block p-0 zoom-1 hover-brighten">
            <div className="row m-0 p-0 d-inline w-25">
              <div
                className="form py-4 cursor-pointer"
                onClick={() => handleOnViewPage(PostID)}
              >
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
                </tr>

                <div className="title text-truncate mx-3 px-2 mt-4 my-2">
                  {menu[1].Title}
                </div>
                <div className="row ml-2">
                  <div className="texttitle col-8 ">{menu[1].SubjectENG}</div>
                  <div className="texttitle col-4 ">{menu[1].SubjectID}</div>
                </div>
                <div className="mx-3 px-2 mb-2">
                  <img className="line-black w-100" src={lineblack} />
                </div>
                <div
                  className="headtext text-truncate mx-3 mt-3 px-2 my-2"
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
                      const fileSP = file.name.split('.')
                      const extFile =
                        fileSP[fileSP.length - 1] == 'pdf' ? PDF : JPG
                      return (
                        <div className="">
                          <img className="pdf d-inline-block" src={extFile} />
                          <div
                            className="text-center text-truncate mr-1 textmore"
                            style={{ maxWidth: '55px' }}
                          >
                            {file.name}
                          </div>
                        </div>
                      )
                    })}
                    {file.length > 3 && (
                      <div
                        className="pdfcount cursor-pointer d-inline-block"
                        onClick={() => handleOnViewPage(PostID)}
                      >
                        <img className="moreItem" src={moreitem} />
                        <div className="textmore">MoreItem</div>
                      </div>
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

  // var expanded = false;

  // function showCheckboxes() {
  //   var checkboxes = document.getElementById("checkboxes");
  //   if (!expanded) {
  //     checkboxes.style.display = "block";
  //     expanded = true;
  //   } else {
  //     checkboxes.style.display = "none";
  //     expanded = false;
  //   }
  // }

  const [dropdown, setDropdrown] = useState(false)

  //
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
  let countPostColumn = [-1, -1]

  const handleOnViewPage = (PostID: string) => {
    history.push(`post/${PostID}`)
  }

  //

  return (
    <div>
      <Jumbotron className="blue-bg jumbotron jumbotron-fluid mb-0">
        <Container className="px-5 pt-5 mt-5 text-center">
          <img
            src={KU_ROUTE}
            className="mx-auto d-block mb-2"
            width="230px"
            height="38px"
            alt="KU_ROUTE"
          />
          {/* <div
            style={{
              width: '462px',
              height: '122px',
              left: '489px',
              top: '303px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '72px',
              lineHeight: '84px',
              display: 'flex',
              // aligntems: 'center',
              // text-align: 'center',
              color: '#02353C',
            }}
          >
            KU-ROUTE  
          </div> */}
          <p
            className="mb-2"
            style={{ color: '#137D54', fontWeight: 'bold', fontSize: '25px' }}
          >
            {' '}
            ค้นหาชื่อวิชา / รหัสวิชาที่อยากรู้
          </p>
          <div className="d-flex justify-content-center">
            <Form className="w-75">
              <div className="form-group shadow d-flex w-100 rounded-lg">
                <SMTDropdown
                  id="home-search-block"
                  fluid
                  search
                  selection
                  options={subjects.slice(0, 10)}
                  onChange={handleOnSelectSubject}
                  onSearchChange={onSearchChange}
                  //onKeyPress={handleOnSearch}
                  type="text"
                  className="form-control text-black d-flex border-0 pr-3"
                  style={{
                    borderRadius: '5px 0rem 0rem 5px',
                    border: 'none',
                    color: 'black',
                  }}
                  icon={
                    <div className="ml-auto">
                      <BsFillCaretDownFill />
                    </div>
                  }
                  placeholder="พิมพ์ชื่อวิชา / รหัสวิชา..."
                />
                <Dropdown show={dropdown}>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="h-100"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      borderRadius: '0rem 5px 5px 0rem',
                    }}
                  >
                    <div onClick={() => setDropdrown(!dropdown)}>
                      <img
                        src={dropdown_arrow}
                        className="p-1"
                        width="18px"
                        height="14px"
                      />
                    </div>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        style={{
                          color: '#02353C',
                          fontWeight: 'bold',
                          fontSize: '12px',
                        }}
                      >
                        FILTER BY
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ color: '#02353C', fontSize: '11px' }}
                      >
                        ประเภท
                      </Dropdown.Item>
                      {filter.map((filter) => (
                        <Dropdown.Item
                          href="#/action-3"
                          style={{ color: '#02353C', fontSize: '11px' }}
                        >
                          <form>
                            <input
                              type="checkbox"
                              className="checkbox-round"
                              style={{
                                boxSizing: 'border-box',
                              }}
                              onClick={() => changeStatus(filter)}
                            />
                            <label>&nbsp;&nbsp;{filter}</label>
                          </form>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Toggle>
                </Dropdown>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-sm px-3 py-2 mt-2 rounded-lg"
                style={{ backgroundColor: '#02353C', borderWidth: '0px' }}
                onClick={handleOnSearch}
              >
                SEARCH
              </button>
            </Form>
          </div>
        </Container>
        <div>
          {/* Post */}
          {allpostData &&
            allpostData.map((object, idx) => {
              return (
                <div className="mb-0">
                  <div className="d-inline-block justify-content-center d-flex ">
                    <div>
                      <div className="my-5 d-block"></div>
                      <div className="row w-content d-flex justify-content-between">
                        <div
                          className="col w-content d-inline-block pt-3 ml-4"
                          style={{ verticalAlign: 'top' }}
                        >
                          {allpostData &&
                            fileUrl &&
                            info &&
                            allpostData.length == fileUrl.length &&
                            allpostData.length == info.length &&
                            allpostData?.map((menu, index) =>
                              renderPost(
                                menu,
                                index,
                                0,
                                fileUrl[index],
                                info[index]
                              )
                            )}
                        </div>

                        <div
                          className="col w-content d-inline-block pt-3 mr-4"
                          style={{ verticalAlign: 'top' }}
                        >
                          {allpostData &&
                            fileUrl &&
                            info &&
                            allpostData.length == fileUrl.length &&
                            allpostData.length == info.length &&
                            allpostData?.map((menu, index) =>
                              renderPost(
                                menu,
                                index,
                                1,
                                fileUrl[index],
                                info[index]
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </Jumbotron>
      {/* <div>
        HomePage
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/signin">sign</Link>
        <br />
        <Link to="/post">post</Link>
        <br />
        <Link to="/create-post">create-post</Link>
        <br />
        <br />
        <Link to="/all-post">all-post</Link>
        <br />
      </div> */}
    </div>
  )
}

export default HomePage
