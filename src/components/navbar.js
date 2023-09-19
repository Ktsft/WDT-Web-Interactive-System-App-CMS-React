import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from "../profile/index";
import { Modal } from "./modal";
import { UserIcon, CreateIcon, LogOutIcon } from "../assets/icon";

export const Navbar = ({ username }) => {

    const history = useHistory();
    const [expanded, setExpanded] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onHandleLogOut = () => {
        localStorage.removeItem('token');
        history.push('/login')
    };


    const toggleNavbar = () => {
        setExpanded(!expanded);
    };


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);  
    };


    const onCloseModal = () => {
        // console.log("this is the on close modal pressed");
        setIsModalOpen(false);
    };


    return(
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <UserIcon style={{ marginRight: '10px' }} />
                    <a className="navbar-brand" href="#" onClick={toggleModal}>
                        {username}
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={expanded}  aria-label="Toggle navigation" onClick={toggleNavbar} >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}  id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CreateIcon style={{ marginRight: '1px' }} />
                                <a className="nav-link" href="#" >Create Room <span className="sr-only"></span></a>
                            </div>   
                        </li>
                        <li className="nav-item">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <LogOutIcon style={{ marginLeft: '4px' }} />
                                <a className="nav-link" href="#" onClick={onHandleLogOut}>Log Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            {isModalOpen && (
                <Modal 
                    show={isModalOpen}
                    onHide={toggleModal}
                    title="Information"
                    width="700px"
                    height="900px"
                    content={<User onCloseModal={onCloseModal}  />}
                />
            )}

        </div>
    )
}