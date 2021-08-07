import '../Sign.css';
import React from "react";
import { Container, Form } from 'react-bootstrap'

type userState = {
  setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Signup = ({ setName, setEmail, setPassword, setSearch, onSubmit }: userState) => {
  return (
    <Container className='col-lg-6 px-4 px-sm-5 pt-5' style={{ paddingTop: "4vh", paddingBottom: "2.5vh" }}>
      <h2>ลงทะเบียนเข้าใช้งาน</h2>
      <p className='mt-3 mb-2'>KU-ROUTE คือ ​เว็บสำหรับแลกเปลี่ยนข่าวสารต่าง ๆ ภายในมหาวิทยาลัยเกษตรศาสตร์</p>
      <Form>
        <div className="mb-2">
          <label className='mb-0' style={{ fontWeight: 'bold' }}>Name</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={setName} // try coding style_1
            placeholder="Enter name"
          />
        </div>

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
        <p className='pt-1 my-1' id='caption'>Use 8 or more characters with a mix of letters, numbers & symbols.</p>
        <div className='mb-2'>
          <button
            type="submit"
            className=" btn btn-block btn-primary"
            style={{ backgroundColor: '#3FD0C9' }}
            onClick={onSubmit}
          >
            Get Started!
          </button>
        </div>
        <div className="mb-4">
          <p id='caption'>
            Already signed up? {""}
            <a href="/signin" id="signin">
              Sign in</a>
          </p>
        </div>
      </Form>
    </Container>
  )
}
export default Signup;