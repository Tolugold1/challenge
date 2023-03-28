import React, { useState, useEffect } from "react";
import "./iconSidebar.styles.scss";
import { GiSlumberingSanctuary } from "react-icons/gi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdSpaceDashboard, MdPeople, MdSettings, MdHeadphones } from "react-icons/md";
import { TbCalendarStats } from "react-icons/tb";
import { Link } from "react-router-dom";
import { baseUrl } from "../baseUrl";


const IconSideNav = () => {
    const [collapse, setCollapse] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        getUserDetails()
    }, [])

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
            setPost(r.status)
        })
    }

    const toggleCollapse = () => setCollapse(!collapse);
    const logOut = () => {
        alert("Are you sure?");
        localStorage.removeItem("token");
        localStorage.removeItem("myId");
        fetch(baseUrl.url + "/users/logout", {
            method: "POST",
            headers: {
                "Content_Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            window.location.assign(resp.status)
        })
    }



    return(
        <div className="iconSideBar">
          <div className="inner_iconBody">
            <div className="brand_heading">
                  <Link to="/home/dashboard" style={{color: "black", textDecoration: "none"}}>
                    <GiSlumberingSanctuary className="brand_logo"/>
                  </Link>
              </div>

              <ul className="navigation_links_2">
                  <div>
                    <Link to="/home/dashboard" className="dash">
                        <MdSpaceDashboard className="navs"/>
                    </Link>
                    <Link to="/home/challenge" className="dash">
                        <MdPeople className="navs" />
                    </Link>
                    <Link to="/home/postschedule" className="dash">
                        <TbCalendarStats className="navs"/>
                    </Link>
                  </div>
              </ul>
              
              <hr />

              <ul className="navigation_links_4">
                <div>
                  <Link to="#" className="dash">
                        <MdSettings className="navs" />
                    </Link>
                    <Link to="#" className="dash">
                        <MdHeadphones  className="navs" />
                    </Link>
                    <Link to="#" className="dash"  onClick={logOut}>
                        <RiLogoutBoxRFill  className="navs" />
                    </Link>
                </div>
              </ul>
          </div>
        </div>
    )
}

export default IconSideNav;
