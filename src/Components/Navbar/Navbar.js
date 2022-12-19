import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Form, FormGroup, InputGroup, Input, Media, Tooltip } from "reactstrap";
import { BiSearch } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io"
import "./Navbar.styles.scss";

const Nav = () => {
    
    const [ userName, setUserName ] = useState({name: ""})
    const [ show, setShow ] = useState(false);
    const toggleShow = () => setShow(!show);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = new Date().getDate();
    const monthString = new Date().getMonth();
    const year = new Date().getFullYear()

    useEffect(() => {
        const bearer = " Bearer " + localStorage.getItem("token");
        const t = localStorage.getItem("token");
        console.log(t);
        fetch("https://localhost:3443/users/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            setUserName(prev => ({...prev, name: resp.username}))
        })
    }, [])
    console.log(userName)
    return(
        <div className="dash_nav">
            <Navbar light>
                <div className="d-flex align-items-center">
                    <NavbarBrand href="/dashboard" className="brandName">Dashboard </NavbarBrand><h5 style={{color: "#C1C5C8", marginTop: "15px", marginLeft: "-6px"}} className="d-none d-md-none d-lg-none d-xl-block">{month[monthString]} {day}, {year}</h5>
                </div>
                <Form className="navForm">
                    <FormGroup>
                        <InputGroup className="search_bar">
                            <BiSearch />
                            <Input type="text" placeholder="Search..." className="input-input"></Input>
                        </InputGroup>
                    </FormGroup>
                </Form>
                <div className="alerm d-none d-md-none d-lg-block ">
                    <IoMdNotifications  style={{width: "40px", height: "40px"}}/>
                </div>
                <Media className="dash_media" id="userName">
                    <Media left middle className="img_media">
                        <Media object src="images.jpeg" className="passport" alt="User image"></Media>
                    </Media>
                    <Media body className="d-none d-md-none d-lg-none ">
                        <h4>User name</h4>
                    </Media>
                </Media>
                <Tooltip className="media-tip" toggle={toggleShow} target="userName" placement="top" isOpen={show}>
                    <h6>{userName.name}</h6>
                </Tooltip>
            </Navbar>
        </div>
    )
}

export default Nav;