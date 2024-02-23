// Header.js
import './header.css';
import './nav.css';
import SubmitButton from './button';

import Modal from 'react-responsive-modal';
import { Form, Button, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
    });
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
    const [userData, setUserData] = useState(null);

    //for Login
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const openModal1 = () => {
        setIsModalOpen1(true);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };
    useEffect(() => {
        if (jwtToken) {
            // You can make a request to get the user data using the JWT token here
            // For simplicity, I'm using a placeholder user data
            const placeholderUserData = {
                name: 'John Doe',
                photoUrl: 'path-to-profile-photo.jpg',
            };
            setUserData(placeholderUserData);
        }
    }, [jwtToken]);


    const handleLoginFormChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: loginFormData.email,
                    password: loginFormData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the JWT token in local storage
                localStorage.setItem('jwtToken', data.jwt);
                setJwtToken(data.jwt);
                closeModal1(); // Close the login modal upon successful login
            } else {
                // Handle login error here
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    const handleLogout = () => {
        // Clear the JWT token from local storage and reset state
        localStorage.removeItem('jwtToken');
        navigate('/');
        setJwtToken(null);
        setUserData(null);
    };



    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src='./logo.jpg' width="50px" style={{borderRadius:"15px"}}/>
                </div>
                <nav className="nav-items">
                    <Link to="/">Home</Link>

                    <Link to="/contact">Contact Us</Link>

                    {/* <a href="#">Events</a> */}
                    {jwtToken ? (
                        <>
                            <Link to="/scholarship">Scholarship</Link>
                            <Link to="/resource">Resources</Link>
                            <Link to="/connect">Connect</Link>
                            <Link to="/mentors">Mentors</Link>
                            <div className="user-profile" style={{display:"flex" , gap:"12px"}}>
                                {/* <img src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Image.png" width='35px' alt="Profile" /> */}
                                {/* <Button variant="logi" onClick={handleLogout}>Logout</Button> */}
                                <button className="logi" onClick={handleLogout}><p>Logout</p></button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* <button className="regi" onClick={openModal}><p>Register</p></button> */}
                            <button className="logi" onClick={openModal1}><p>Login</p></button>
                        </>
                    )}
                </nav>
            </header>
            
            <Modal styles={{ overlay: { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.547)' } }} open={isModalOpen1} onClose={closeModal1} center classNames={{ modal: 'modal-container' }}>
                {/* Registration form */}

                <div className="modal-content">
                    <h2>Login</h2>
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group controlId="formEmail" className="group"  >
                            <Form.Label className="label">Email </Form.Label>

                            <Form.Control type="email" name='email'  placeholder="Enter your email address" value={loginFormData.email}
                                onChange={handleLoginFormChange}/>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="group">
                            <Form.Label className="label ">Password</Form.Label>

                            <Form.Control type="password" placeholder="Enter your password" name='password' value={loginFormData.password}
                                onChange={handleLoginFormChange}/>
                        </Form.Group>
                        <SubmitButton label="Login" type="submit" />
                    </Form>

                </div>

            </Modal>
        </>
    );
}



export default Header;