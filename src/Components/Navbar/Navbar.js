import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Form, FormGroup, InputGroup,
    Input, Media, Tooltip, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { BiSearch } from "react-icons/bi";
import { Buffer } from "buffer";
import { IoMdNotifications } from "react-icons/io"
import { useLocation, Outlet } from "react-router-dom";
import "./Navbar.styles.scss";
import { baseUrl } from '../baseUrl'

const Nav = () => {

    const location = useLocation();
    let path = [ "/home/dashboard", "/home/challenge", "/home/postschedule" ];
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
        const personalRequestAcct = () => {
            const bearer = "Bearer " + localStorage.getItem("token")
            fetch(baseUrl.url + "/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then(resp => {resp.json()}, (err) => console.log(err))
            .catch(err => console.log(err))
        }; 
        personalRequestAcct()
        const personalAcceptAcct = () => {
            const bearer = "Bearer " + localStorage.getItem("token")
            fetch(baseUrl.url + "/accept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then(resp => {resp.json()}, (err) => console.log(err))
            .catch(err => console.log(err))
        }; 
        personalAcceptAcct()
        let s = []
        const notification = () => {
            const bearer = "Bearer " + localStorage.getItem("token");
            fetch(baseUrl.url + "/request", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            })
            .then((resp) => resp.json())
            .then((resp) => {
                setNotify({count: resp.status.requestSenderId.length})
                for (let i = 0; i <= resp.status.requestSenderId.length - 1; i++) {
                    getRequestSenderImg(resp.status.requestSenderId[i]._id)
                }
            }, (err) => console.log(err)).catch(err => console.log(err));
        };
        
        notification();

        const getRequestSenderImg = (id) => {
            fetch(baseUrl.url + `/upload/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then((r) => {
                s.push(r.status[0])
            })
        }
        localStorage.setItem("number_of_notification", notify.count)
        setEachSenderId(s);
        getUserdata();
        getUserDetails();
    }, [notify.count])


    const getUserdata = () => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(baseUrl.url + "/users/user", {
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
        fetch(baseUrl.url + "/upload", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
        .then((r) => {
            console.log("r", r.status[0])
            setProfilePicture(r.status)
            localStorage.setItem("repository", r.status[0].github_repo_name
            )
        })
    }

    const deleteSenderId = (senderId) => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(baseUrl.url + `/request/${senderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json)
    }

    const AcceptedARequest = (id) => {
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(baseUrl.url + `/accept/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
            }
        })
        .then(resp => resp.json())
    };

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
                <Button id="notification" toggle={toggle} className="alarm d-none d-md-none d-lg-block ">
                    <div className="noti_count">{notify.count}</div>
                    <IoMdNotifications className="notify"/>
                </Button>
                <Popover className="pop" target="#notification" toggle={toggle} placement="bottom" isOpen={showPop}>
                    <PopoverHeader className="noti_pop_header">welcome</PopoverHeader>
                    <PopoverBody className="noti_pop_body">
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
                                        <Button className="accept_btn" onClick={AcceptedARequest(d.userId)}>+</Button>
                                        <Button className="accept_btn" onClick={() => {deleteSenderId(d.userId)}}>-</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </PopoverBody>
                </Popover>
                {profilePicture.map((data, key) => {
                    return(
                        <div key={key}>
                        <Media className="dash_media" id="userName" >
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
                        </div>
                    )
                })}
            </Navbar>
            <Outlet />
        </div>
    )
}

export default Nav;