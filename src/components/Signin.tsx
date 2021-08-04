import '../Sign.css';
import React from "react";
import { Container,Form, Jumbotron} from 'react-bootstrap'
import logo_long from '../assets/icons/logo-long.png'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'

type userState ={
    Email: string,
    Password: string,
    Search: string
}
export default class Signin extends React.Component<userState> {
    state: userState = {
        Email: '',
        Password: '',
        Search: ''
    };
    onSubmit = () => {
        console.log(this.state);
    }
    onSearch = () => {
        console.log(this.state);
    }
    render() {
    return(
        <Jumbotron className='blue-bg jumbotron jumbotron-fluid mb-0'>
            <Container className='text-center header-block'>
                <h3 className='header' style={{fontSize:'40px'}}>SIGN UP</h3>
                <h5 style={{color:'#02353C'}}>ลงทะเบียนเข้าใช้งานเพื่อเริ่มต้นใช้งานเว็บไซต์</h5>
            </Container>
            
            <Container className='shadow rounded mx-auto' style={{maxWidth:'60vw', minWidth:'300px',backgroundColor:''}}>
                <div className='row myform'>
                    <Container className='col-lg-6 px-4 px-sm-5 pt-5' style={{paddingTop:"4vh", paddingBottom:"2.5vh"}}>
                        <h2>ลงทะเบียนเข้าใช้งาน</h2>
                        <p className='mt-3 mb-2'>KU-ROUTE คือ ​เว็บสำหรับแลกเปลี่ยนข่าวสารต่าง ๆ ภายในมหาวิทยาลัยเกษตรศาสตร์</p>
                        <Form>
                            <div className="mb-2">
                            <label className='mb-0' style={{fontWeight:'bold'}}>Email</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={(e) => this.setState(this.state.Email = e.target.value)} // try coding style_2 (shorter)
                                placeholder="Enter email"
                            />
                            </div>

                            <div className="mb-2">
                            <label className='mb-0' style={{fontWeight:'bold'}}>Password</label>
                            <input
                                type="password"
                                required
                                className="form-control"
                                onChange={(e) => this.setState(this.state.Password = e.target.value)} // try coding style_2 (shorter)
                                placeholder="Enter password"
                            />
                            </div>
                            <div className='mb-2'>
                                <button
                                    type="submit"
                                    className=" btn btn-block btn-primary"
                                    style={{backgroundColor:'#3FD0C9'}}
                                    onClick={this.onSubmit}
                                >
                                    Log in
                                </button>
                                </div>
                            <div className="mb-4">
                            <p id='caption'>
                                <a href = 'http://localhost:3000'>Forgot password?</a>
                            </p>
                            <p id='caption'>
                                New to KU-ROUTE? {""}
                                <a href="/" id="signin">
                                 Sign up</a>
                            </p>
                            </div>
                        </Form>
                    </Container>
                    <Container className='col-lg-6 px-0' style={{minHeight:'500px'}}>
                        <div className='upperCard d-flex align-items-center'>
                            <img src={logo_long} className='mx-auto pl-3' width='284px' height='54px' alt='logolong'/>
                        </div>
                        {/*<div className='lowerCard text-center pt-5 pb-4 pt-sm-5 py-sm-3 px-3 px-sm-5'>*/}
                        <div className='lowerCard d-flex align-items-center'>
                            <Container className='px-5 text-center'>
                                <img src={KU_ROUTE} className='mx-auto d-block mb-2' width='130px' height='20px' alt='KU_ROUTE'/>
                                <p className='mb-2' style={{color:'#137D54', fontWeight:'bolder'}}> ค้นหาชื่อวิชา / รหัสวิชาที่อยากรู้</p>
                                <Form>
                                    <div className="form-group shadow">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => this.setState(this.state.Search = e.target.value)}
                                        placeholder="เรื่องที่อยากรู้..."
                                    />
                                    </div>
                                    <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                    style={{backgroundColor:'#02353C'}}
                                    onClick={this.onSearch}
                                    >
                                    search
                                </button>
                                </Form>
                            </Container>
                        </div>
                    </Container>
                </div>
            </Container>
        </Jumbotron>
    )
    }
}