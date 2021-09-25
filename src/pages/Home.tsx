import React, { useState } from 'react'
import { Jumbotron, Container, Form, Dropdown } from 'react-bootstrap'
import { Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'
import dropdown_arrow from '../assets/icons/dropdownArrow.png'
import uncheckIcon from './../assets/icons/checkbox.png'
import 'semantic-ui-css/semantic.min.css'
import RoundedCheckbox from 'react-native-rounded-checkbox'
import { CheckBoxRounded } from '@material-ui/icons'

const HomePage = () => {
  const mockFilter = [['คลังหนังสือ'], ['ชีทสรุป'], ['แบบฝึกหัด']]

  const [allFilter, setAllFilter] = useState<string[][]>(mockFilter)

  const [checked, setChecked] = React.useState(false)
  const handleChange = () => {
    setChecked(!checked)
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
          <Form style={{ paddingLeft: '22vw', paddingRight: '22vw' }}>
            {/* <div className="form-group shadow d-flex">
              <input
                type="text"
                className="form-control"
                style={{ borderRadius: '5px 0rem 0rem 5px', border: 'none' }}
                placeholder="เรื่องที่อยากรู้..."
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: '34px',
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
                  <Dropdown.Divider />
                  <Dropdown.Item style={{ color: '#02353C', fontSize: '11px' }}>
                    ประเภท
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <Checkbox
                      radio
                      label="คลังหนังสือ"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    style={{ color: '#02353C', fontSize: '11px' }}
                  >
                    <Checkbox
                      radio
                      label="ชีทสรุป"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    style={{ color: '#02353C', fontSize: '11px' }}
                  >
                    <Checkbox
                      radio
                      label="แบบฝึกหัด"
                      style={{ color: '#02353C', fontSize: '11px' }}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
            <div
              className="d-inline-flex shadow"
              style={{
                marginBottom: '15px',
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{
                  borderRadius: '5px 0rem 0rem 5px',
                  height: '34px',
                  border: 'none',
                  width: '450px',
                }}
                placeholder="เรื่องที่อยากรู้..."
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  // className="shadow"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: '34px',
                    border: 'none',
                    borderRadius: '0rem 5px 5px 0rem',
                  }}
                >
                  <img
                    src={dropdown_arrow}
                    className="p-1"
                    width="18px"
                    height="14px"
                  />
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
                        {/* <Checkbox
                                label={filter[0]}
                                style={{  
                                  fontSize: '11px',
                                }}
                                // onChange={handleChange}
                              /> */}
                        <div className="round d-inline-flex">
                          <input
                            type="checkbox"
                            // id="checkbox"
                            style={{
                              color: '#2EAF7D',
                              borderRadius: '5px 5px 5px 5px',
                            }}
                          />
                          <label>{filter[0]}</label>
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: '#02353C', borderWidth: '0px' }}
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
      </div>
    </div>
  )
}

export default HomePage
