import React, { useState } from 'react'
import { Jumbotron, Container, Form, Dropdown } from 'react-bootstrap'
import { Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'
import dropdown_arrow from '../assets/icons/Vector (2).png'
import 'semantic-ui-css/semantic.min.css'
import Subjects from 'constants/subjects.json'
import { ISubject } from 'interface/subject.interface'
import { Dropdown as SMTDropdown } from 'semantic-ui-react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { constTags } from 'constants/index'
import { useHistory, useLocation } from 'react-router'
import applicationStore from 'stores/applicationStore'

interface dropdownType {
  text: string
  value: number
}

const HomePage = () => {
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
      _subjects.filter((s) => s.text.includes(event.target.value)).slice(0, 10)
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

  return (
    <div>
      <Jumbotron className="blue-bg jumbotron jumbotron-fluid mb-0">
        <Container className="px-5 pt-5 mt-5 text-center">
          <img
            src={KU_ROUTE}
            className="mx-auto d-block mb-2"
            width="230px"
            height="35px"
            alt="KU_ROUTE"
          />
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
              <Dropdown>
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
                  <img
                    src={dropdown_arrow}
                    className="p-1"
                    width="17px"
                    height="15px"
                  />
                </Dropdown.Toggle>
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
                  {/* <Dropdown.Item style={{ color: '#02353C', fontSize: '11px'}}>สาระวิชา</Dropdown.Item>
              <Dropdown.Item href="#/action-3" >
			  	<Checkbox label="สาระอยู่ดีมีสุข" style={{ color: '#02353C', fontSize: '11px'}} />
			  </Dropdown.Item>
              <Dropdown.Item href="#/action-3" style={{ color: '#02353C', fontSize: '11px'}}>
			  	<Checkbox label="สาระพลเมืองโลก" style={{ color: '#02353C', fontSize: '11px'}} />
			  </Dropdown.Item>
			  <Dropdown.Item href="#/action-3" style={{ color: '#02353C', fontSize: '11px'}}>
			  	<Checkbox label="สาระสุนทรียาสตร์" style={{ color: '#02353C', fontSize: '11px'}} />
			  </Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item style={{ color: '#02353C', fontSize: '11px' }}>
                    ประเภท
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <Checkbox
                      label="คลังหนังสือ"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    style={{ color: '#02353C', fontSize: '11px' }}
                  >
                    <Checkbox
                      label="ชีทสรุป"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    style={{ color: '#02353C', fontSize: '11px' }}
                  >
                    <Checkbox
                      label="แบบฝึกหัด"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
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
      <div>
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
      </div>
    </div>
  )
}

export default HomePage
