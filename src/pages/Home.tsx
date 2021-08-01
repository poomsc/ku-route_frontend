import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return(
        <div>
            HomePage
            <br/>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/sign">sign</Link>
            <br/>
            <Link to="/post">post</Link>
            <br/>
            <Link to="/create-post">create-post</Link>
            <br/>
        </div>
    )
}

export default HomePage