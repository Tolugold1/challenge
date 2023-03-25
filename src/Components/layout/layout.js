import React from 'react';
import SideNav from '../Sidebar/SideNav';
import Nav from "../Navbar/Navbar"
import "./layout.styles.scss"


const layout = (Component) => ({...props}) =>  {
    // layout component (HOC)
  return (
    <div className='layout'>
        <div className='sidebar'>
            <SideNav />
        </div>
        <div className='challenge_nav'>
            <div className='headerNav'>
                <Nav />
            </div>
            <Component {...props}/>
        </div>
    </div>
  )
}

export default layout;