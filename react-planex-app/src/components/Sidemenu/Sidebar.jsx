import React, { useState } from 'react'
import { SlClose } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { Logo } from "../Header/Logo";
import { BsPersonCircle } from "react-icons/bs";
import { IoExitOutline } from 'react-icons/io5'


export const Sidebar = (props) => {

   
    return (
        <>
            <div className="Sidebar">

                <nav className={props.clickedSidebar ? 'sidebar bar_active' : 'sidebar'}>

                    <div className="sidebar_all_items">
                        <div className='sidebar_toogle' onClick={props.showSidebar}>
                            <Link to="#" className="sidebar_menu_bars">
                                <SlClose
                                    size={30}
                                    className="sidebar_close_icon" />
                            </Link>
                        </div>

                        <div className='sidebar_top'>
                            <BsPersonCircle size={55} className="person_icon" />
                            <div className="div_sidebar_top_text">
                                <p className="sidebar_top_text">{props.login}</p>
                                <p className="sidebar_top_text">{props.email}</p>
                            </div>

                        </div>
                        <div className="sidebar_line"></div>

                        <div className="sidebar_main_items" onClick={props.showSidebar}>

                            {SidebarData.map((item, index) => {
                                return (
                                    <div key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            <span>{item.title}</span>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="sidebar_bottom" >
                            <Logo id="green" className="logo_bottom" />
                            <Link to={'/home'}>
                                <IoExitOutline
                                    size={40}
                                    className="sb_exit_icon"
                                    onClick={() => { props.showSidebar(); props.exit() }}

                                />
                            </Link>
                        </div>
                    </div>


                </nav>
            </div>
        </>
    )
}

