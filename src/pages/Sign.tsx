import React from 'react'
import Signup from 'components/Signup'
import Signin from 'components/Signin'
import { useState } from 'react'
import { Jumbotron, Container, Form } from 'react-bootstrap'
import logo_short_light from '../assets/icons/logo-short-light.png'
import KU_ROUTE_light from '../assets/icons/KU-ROUTE-light.png'
import { signIn_Google } from "service/auth";
import { Redirect, useHistory } from "react-router";
import { observer } from 'mobx-react-lite'
import applicationStore from 'stores/applicationStore'


const SignPage = observer( () => {
  const history = useHistory()
  if(applicationStore.user) {
    history.push('/')
  }

  const [Name, setName] = useState<string>('')
  const [Email, setEmail] = useState<string>('')
  const [Password, setPassword] = useState<string>('')
  const [Search, setSearch] = useState<string>('')

  const page = window.location.href.split('/').slice(-1)[0]

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }
  const onChangeSearch = (e: any) => {
    setSearch(e.target.value)
  }
  const onSubmit = () => {
    console.log(Name, Email, Password)
  }
  const onGoogleLogIn = () => {
    signIn_Google()
  }
  return (
    <Jumbotron className="blue-bg jumbotron jumbotron-fluid mb-0">
      <Container className="text-center header-block">
        {console.log(page)}
        {page === 'signin' ? (
          <>
            <h3 className="header" style={{ fontSize: '40px' }}>
              SIGN IN
            </h3>
            <h5 style={{ color: '#02353C' }}>
              เข้าสู่ระบบเพื่อเข้าใช้งานเว็บไซต์
            </h5>
          </>
        ) : (
          <>
            <h3 className="header" style={{ fontSize: '40px' }}>
              SIGN UP
            </h3>
            <h5 style={{ color: '#02353C' }}>
              ลงทะเบียนเข้าใช้งานเพื่อเริ่มต้นใช้งานเว็บไซต์
            </h5>
          </>
        )}
      </Container>

      <Container
        className="shadow rounded mx-auto"
        style={{ maxWidth: '60vw', minWidth: '300px', backgroundColor: '' }}
      >
        <div className="row myform">
          {page === 'signin' ? (
            <Signin
              setEmail={onChangeEmail}
              setPassword={onChangePassword}
              setSearch={onChangeSearch}
              onSubmit={onSubmit}
              onGoogleLogIn={onGoogleLogIn}
            />
          ) : (
            <Signup
              setName={onChangeName}
              setEmail={onChangeEmail}
              setPassword={onChangePassword}
              setSearch={onChangeSearch}
              onSubmit={onSubmit}
              onGoogleLogIn={onGoogleLogIn}
            />
          )}
          <Container className="col-lg-6 px-0" style={{ minHeight: '500px' }}>
            <div className="rightCard text-center pt-5 justify-content-center">
              <div className="d-block pt-5">
                <img
                  src={logo_short_light}
                  className="mx-auto pt-4 pb-3"
                  width="170px"
                  height="auto"
                  alt="logolong"
                />
              </div>
              <div className="d-block">
                <img
                  src={KU_ROUTE_light}
                  className="mx-auto "
                  width="170px"
                  height="auto"
                  alt="logolong"
                />
              </div>
            </div>
            {/*
            <div className='upperCard d-flex align-items-center'>
              <img src={logo_long} className='mx-auto pl-3' width='284px' height='54px' alt='logolong' />
            </div>

            <div className='lowerCard d-flex align-items-center'>
              <Container className='px-5 text-center'>
                <img src={KU_ROUTE} className='mx-auto d-block mb-2' width='130px' height='20px' alt='KU_ROUTE' />
                <p className='mb-2' style={{ color: '#137D54', fontWeight: 'bolder' }}> ค้นหาชื่อวิชา / รหัสวิชาที่อยากรู้</p>
                <Form>
                  <div className="form-group shadow">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="เรื่องที่อยากรู้..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: '#02353C' , borderWidth:'0px'}}
                  >
                    search
                  </button>
                </Form>
              </Container>
            </div>
            */}
          </Container>
        </div>
      </Container>
    </Jumbotron>
  )
})

export default SignPage
