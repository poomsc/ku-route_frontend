import React from 'react'
import { Jumbotron, Container, Form, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import KU_ROUTE from '../assets/icons/KU-ROUTE.png'

const HomePage = () => {
	return (
		<div>
			<Jumbotron className='blue-bg jumbotron jumbotron-fluid mb-0'>
				<Container className='px-5 text-center'>
					<img src={KU_ROUTE} className='mx-auto d-block mb-2' width='130px' height='20px' alt='KU_ROUTE' />
					<p className='mb-2' style={{ color: '#137D54', fontWeight: 'bolder' }}> ค้นหาชื่อวิชา / รหัสวิชาที่อยากรู้</p>
					<Form>
						<div className="form-group shadow d-flex">
							<input
								type="text"
								className="form-control"
								style={{borderRadius:'5px 0rem 0rem 5px'}}
								placeholder="เรื่องที่อยากรู้..."
							/>
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:'0px 5px 5px 0px'}}>
									Dropdown Button
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
									<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<button
							type="submit"
							className="btn btn-primary btn-sm"
							style={{ backgroundColor: '#02353C', borderWidth: '0px' }}
						>
							search
						</button>
					</Form>
				</Container>
			</Jumbotron>
			<div>
				HomePage
				<br />
				<Link to="/">Home</Link>
				<br />
				<Link to="/sign">sign</Link>
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
