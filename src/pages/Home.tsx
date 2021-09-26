import React, { useState } from 'react'
import { Jumbotron, Container, Form, Dropdown } from 'react-bootstrap'
import { Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'
import dropdown_arrow from '../assets/icons/dropdownArrow.png'
import uncheckIcon from './../assets/icons/checkbox.png'
import 'semantic-ui-css/semantic.min.css'
import Multiselect from 'multiselect-react-dropdown'

const HomePage = () => {
  const mockFilter = [['คลังหนังสือ'], ['ชีทสรุป'], ['แบบฝึกหัด']]
  const [filter, setFilter] = useState(['คลังหนังสือ', 'ชีทสรุป', 'แบบฝึกหัด'])

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
          <Form style={{ paddingLeft: '22vw', paddingRight: '22vw' }}>
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
                        <form>
                          <input
                            type="checkbox"
                            className="checkbox-round"
                            style={{
                              boxSizing: 'border-box',
                            }}
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
