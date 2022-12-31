import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Form, FormGroup, InputGroup, Input, Media, Tooltip } from "reactstrap";
import { BiSearch } from "react-icons/bi";
import { Buffer } from "buffer";
import { IoMdNotifications } from "react-icons/io"
import { useLocation  } from "react-router-dom";
import "./Navbar.styles.scss";

const Nav = () => {

    const location = useLocation();
    console.log(location.pathname);
    let path = [ "/dashboard", "/challenge", "/post schedule" ];
    let exactPath;
    if (location.pathname == path[0]) {
        exactPath = "Dashboard";
    } else if (location.pathname == path[1]) {
        exactPath = "Challenge";
    } else if (location.pathname == path[2]) {
        exactPath = "Post Schedule";
    }
    
    const [ userName, setUserName ] = useState({name: ""})
    const [ show, setShow ] = useState(false);
    const [ profilePicture, setProfilePicture ] = useState([])
    const toggleShow = () => setShow(!show);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = new Date().getDate();
    const monthString = new Date().getMonth();
    const year = new Date().getFullYear()

    useEffect(() => {
       getUserdata();
       getUserDetails();
    }, [])

    const getUserdata = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("https://localhost:3443/users/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            setUserName(prev => ({...prev, name: resp.username}))
        }, (err) => console.log(err)).catch(err => console.log(err));
    }

    const getUserDetails = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("https://localhost:3443/upload", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then((r) => {
            setProfilePicture(r.status)
        })
    }

    return(
        <div className="dash_nav">
            <Navbar light>
                <div className="d-flex align-items-center">
                    <NavbarBrand href={`/${exactPath}`} className="brandName">{exactPath} </NavbarBrand><h5 style={{color: "#C1C5C8", marginTop: "15px", marginLeft: "-6px"}} className="d-none d-md-none d-lg-none d-xl-block">{month[monthString]} {day}, {year}</h5>
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
                {profilePicture.map((data) => {

                    return(
                        <>
                        <Media className="dash_media" id="userName" key={data._id}>
                            <Media left middle className="img_media">
                                <Media object src={`data:${data.pics.contentType};base64,${Buffer.from(data.pics.data.data).toString('base64')}`} className="passport" alt="User image"></Media>
                            </Media>
                            <Media body className="d-none d-md-none d-lg-none ">
                                <h4>User name</h4>
                            </Media>
                        </Media>
                        <Tooltip className="media-tip" toggle={toggleShow} target="userName" placement="top" isOpen={show} >
                            <h6>{userName.name}</h6>
                        </Tooltip>
                        </>
                    )
                })}
            </Navbar>
        </div>
    )
}

export default Nav;