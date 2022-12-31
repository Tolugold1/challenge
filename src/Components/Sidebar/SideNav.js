import React, { useState, useEffect } from "react";
import "./sideNav.styles.scss";
import { Collapse } from "reactstrap";
import { GiSlumberingSanctuary } from "react-icons/gi";
import { ImSphere } from "react-icons/im";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdSpaceDashboard, MdPeople, MdSettings, MdHeadphones } from "react-icons/md";
import { TbCalendarStats } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";


const SideNav = () => {
    const [collapse, setCollapse] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        getUserDetails()
    }, [])

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
            setPost(r.status)
        })
    }

    const [ user, setUser ] = useState(false);

    const toggleCollapse = () => setCollapse(!collapse);
    const logOut = () => {
        alert("Are you sure?");
        localStorage.removeItem("token");
        setUser(!user);
    }



    return(
        <div className="side_nav">
            {user && (<Navigate to="/" />)}
            <div className="brand_heading">
                <GiSlumberingSanctuary style={{width: "30px", height: "30px", color: "#775DA6"}}/> <Link to="/dashboard" style={{color: "black", textDecoration: "none"}}><h2 className="brand">IChallenge</h2></Link>
            </div>

            <div className="user_socialmedia_accordion" onClick={toggleCollapse}>
                <div className="user_social">
                    <ImSphere style={{width: "30px", height: "30px", color: "#775DA6", marginRight: "15px"}} />
                    <div className="user_mail">
                        <p>@illiyinStudio <br /> <span className="instagram">Instagram</span></p>
                        <div className="forwar_bacward_icons">
                            {
                                collapse ? <IoIosArrowDown style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "16px"}}/> : <IoIosArrowForward style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "16px"}}/>
                            }
                        </div>
                    </div>
                </div>
                <Collapse isOpen={collapse} >
                    {post.map((data) => {
                        return(
                            <ul className="medias" key={data._id}>
                                <li>{`${data.twittername}@twitter`}</li>
                                <li>{`${data.githubname}@gitHub`}</li>
                                <li>{`${data.facebookname}@facebook`}</li>
                            </ul>
                        )
                    })}
                </Collapse>
            </div>

            <h6 style={{color: "grey", marginLeft: "10px", marginTop: "40px"}}>MAIN NAVIGATION</h6>

            <ul className="navigation_links">
                <Link to="/dashboard" className="dash">
                    <li className="lists"><MdSpaceDashboard style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}} /> Dashboard</li>
                </Link>
                <Link to="/challenge" className="dash">
                    <li className="lists"><MdPeople style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}} /> Challenge</li>
                </Link>
                <Link to="/postschedule" className="dash">
                    <li className="lists"><TbCalendarStats style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}} /> Post schedule</li>
                </Link>
            </ul>
            <hr />

            <ul className="navigation_links1">
                <Link to="#" className="dash">
                    <li className="lists"><MdSettings style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}} /> Help & Support</li>
                </Link>
                <Link to="#" className="dash">
                    <li className="lists"><MdHeadphones style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}} /> Admin</li>
                </Link>
                <Link to="#" className="dash"  onClick={logOut}>
                    <li className="lists" ><RiLogoutBoxRFill style={{width: "27px", height: "27px", color: "#775DA6", marginRight: "10px"}}/> Logout</li>
                </Link>
            </ul>
        </div>
    )
}

export default SideNav;