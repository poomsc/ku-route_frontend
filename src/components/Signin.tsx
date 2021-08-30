import '../Sign.css';
import React from "react";
import { Container, Form, Jumbotron } from 'react-bootstrap'
import google from '../assets/icons/google.png'

type userState = {
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Signin = ({ setEmail, setPassword, setSearch, onSubmit }: userState) => {

  return (
    <Container className='col-lg-6 px-4 px-sm-5 pt-5' style={{ paddingTop: "4vh", paddingBottom: "2.5vh" }}>
      <h2 className='mb-4'>เข้าสู่ระบบ</h2>
      {/* <p className='mt-3 mb-2'>KU-ROUTE คือ ​เว็บสำหรับแลกเปลี่ยนข่าวสารต่าง ๆ ภายในมหาวิทยาลัยเกษตรศาสตร์</p> */}
      <Form>
      <div className='mt-3 mb-2 gg-shadow'>
          <button
            type="submit"
            className=" btn btn-block btn-primary "
            style={{ backgroundColor: '#4385F5', borderWidth: '0px',paddingLeft:'2px',paddingTop:'2px',paddingBottom:'2px'}}
            onClick={onSubmit}
          >
            <div className=''>
              <img src={google} className='rounded d-flex float-left p-1' width='32px' height='auto' alt='googleicon' style={{ backgroundColor: 'white' }} />
              <div className='p-1'>Sign up with Google</div>
            </div>
          </button>
        </div>

        <hr/>
        <div className="mb-2">
          <label className='mb-0' style={{ fontWeight: 'bold' }}>Email</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={setEmail} // try coding style_2 (shorter)
            placeholder="Enter email"
          />
        </div>

        <div className="mb-2">
          <label className='mb-0' style={{ fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            required
            className="form-control"
            onChange={setPassword} // try coding style_2 (shorter)
            placeholder="Enter password"
          />
        </div>
        <div className='mb-2'>
          <button
            type="submit"
            className=" btn btn-block btn-primary"
            style={{ backgroundColor: '#3FD0C9' , borderWidth:'0px'}}
            onClick={onSubmit}
          >
            Log in
          </button>
        </div>
        <div className="mb-4">
          <p id='caption'>
            <a href='/'>Forgot password?</a>
          </p>
          <p id='caption'>
            New to KU-ROUTE? {""}
            <a href="/signup" id="signup">
              Sign up</a>
          </p>
        </div>
      </Form>
    </Container>
  )
}
export default Signin;