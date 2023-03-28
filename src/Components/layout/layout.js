import React, { Component } from 'react';
import SideNav from '../Sidebar/SideNav';
import IconSideNav from '../Sidebar/icon_sidebar';
import "./layout.styles.scss"


const layout = (Component) => ({...props}) =>  {
    // layout component (HOC)
  return (
    <div className='layout'>
        <div>
          <div className='sidebar'>
              <SideNav />
          </div>
          <div className='icon_side_nav'>
            <IconSideNav />
          </div>
        </div>
        <div className='challenge_nav'>
            <Component {...props}/>
        </div>
    </div>
  )
}

export default layout;