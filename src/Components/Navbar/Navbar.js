import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Form, FormGroup, InputGroup,
    Input, Media, Tooltip, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { BiSearch } from "react-icons/bi";
import { Buffer } from "buffer";
import { IoMdNotifications } from "react-icons/io"
import { useLocation  } from "react-router-dom";
import "./Navbar.styles.scss";

const Nav = () => {

    const location = useLocation();
    let path = [ "/dashboard", "/challenge", "/post schedule" ];
    let exactPath;
    if (location.pathname === path[0]) {
        exactPath = "Dashboard";
    } else if (location.pathname === path[1]) {
        exactPath = "Challenge";
    } else if (location.pathname === path[2]) {
        exactPath = "Post Schedule";
    }
    
    const [ userName, setUserName ] = useState({name: ""})
    const [ show, setShow ] = useState(false);
    const [ profilePicture, setProfilePicture ] = useState([]);
    const [ request, setRequest ] = useState([]);
    const [ eachSenderId, setEachSenderId ] = useState([]);
    const [ notify, setNotify ] = useState({count: 0});
    const [ showPop, setShowPop ] = useState(false)
    const toggle = () => setShowPop(!showPop);
    const toggleShow = () => setShow(!show);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = new Date().getDate();
    const monthString = new Date().getMonth();
    const year = new Date().getFullYear()

    useEffect(() => {
        notification();
        getUserdata();
        getUserDetails();
    }, [])

    const notification = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("https://localhost:3443/request", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then((resp) => resp.json())
        .then((resp) => {
            setNotify({count: resp.status.requestSenderId.length})
            setRequest(resp.status.requestSenderId)
        }, (err) => console.log(err)).catch(err => console.log(err));
    }
    console.log("request", request)


    const getRequestSenderImg = () => {
        let senderId = []
        for (let data = 0; data <= request.length - 1; data++) {
            senderId.push(request[data]._id)
            console.log(senderId)
        }
        let s = []
        for (let i = 0; i <= senderId.length - 1; i++) {
            fetch(`https://localhost:3443/upload/${senderId[i]}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then((r) => {
                console.log("r.status",r.status)
                s.push(r.status[0])
                setEachSenderId(s)
            })
        }
        console.log("s", s)
    }
    console.log("eachSenderId", eachSenderId)
    localStorage.setItem("number_of_notification", notify.count)

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
                <Button id="notification" toggle={toggle} className="alarm d-none d-md-none d-lg-block " onClick={
    getRequestSenderImg}>
                    <div className="noti_count">{notify.count}</div>
                    <IoMdNotifications className="notify"/>
                </Button>
                <Popover className="pop" target="#notification" toggle={toggle} placement="bottom" isOpen={showPop}>
                    <PopoverHeader className="noti_pop_header">welcome</PopoverHeader>
                    <PopoverBody className="noti_pop_body">{/* 
                    {request.map((data, key) => { */}
                        {eachSenderId.map((d, key) => {
                            return (
                                <div className="pop_over_body" key={key}>
                                    <Media className="pop_media">
                                        <Media left middle className="sender_img">
                                            <Media object src={`data:${d.pics.contentType};base64,${Buffer.from(d.pics.data.data).toString('base64')}`} alt="sender image" className="avatar"/>
                                        </Media>
                                        <Media body>
                                            <p className="sender_name">{d.githubname}</p>
                                        </Media>
                                    </Media>
                                    <div className="btns">
                                        <Button className="accept_btn">+</Button>
                                        <Button className="accept_btn">-</Button>
                                    </div>
                                </div>
                            )
                        })}{/* 
                    })} */}
                    </PopoverBody>
                </Popover>
                {profilePicture.map((data, key) => {
                    return(
                        <>
                        <Media className="dash_media" id="userName" key={key}>
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