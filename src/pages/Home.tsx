import React, { useState } from 'react'
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

interface dropdownType {
  text: string
  value: number
}

const HomePage = () => {
  const mockFilter = [['คลังหนังสือ'], ['ชีทสรุป'], ['แบบฝึกหัด']]
  const [filter, setFilter] = useState(['คลังหนังสือ', 'ชีทสรุป', 'แบบฝึกหัด'])

  const [allFilter, setAllFilter] = useState<string[][]>(mockFilter)

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
  }

  const handleOnSearch = () => {
    if (!subjectSelected) return
    const SubjectIDandTH = subjectSelected.split(' ')
    const SubjectENG = subjectSelected.split('(')
    // applicationStore.setSubjectSearch(
    //   SubjectIDandTH[0],
    //   SubjectIDandTH[1],
    //   SubjectENG[1].replace(')', '')
    // )
    localStorage.setItem('currentSearch', subjectSelected)
    console.log('Searching... ' + SubjectIDandTH[0])
    goToAllPost()
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

  const [dropdown, setDropdrown] = useState(true)

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
          <Form style={{ paddingLeft: '7vw', paddingRight: '7vw' }}>
            <div className="form-group shadow d-flex w-100 rounded-lg">
              <SMTDropdown
                id="home-search-block"
                fluid
                search
                selection
                options={subjects.slice(0, 10)}
                onChange={handleOnSelectSubject}
                onSearchChange={onSearchChange}
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
                    {allFilter.map((filter) => (
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
                            onClick={() => console.log(filter[0])}
                          />
                          <label>&nbsp;&nbsp;{filter[0]}</label>
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
        </Container>
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
