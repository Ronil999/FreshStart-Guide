import 'react-responsive-modal/styles.css';
import { Link } from "react-router-dom";
import './homepage.css';
import { Carousel } from 'react-responsive-carousel';
import './nav.css';
import Footer from "./footer";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Carousel from './Carousel';

import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import Memo from './memories';
import Social from './social';
import { Form, Button, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';


function NavScrollExample() {

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setJwtToken(null);
        setUserData(null);
    };


    const [carouselData, setCarouselData] = useState([]);

    useEffect(() => {
        // Fetch data from your Strapi API
        fetch('http://localhost:1337/api/carousels?populate=*')
            .then((response) => response.json())
            .then((data) => {
                setCarouselData(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>

            <main style={{
                // display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '100vh', // Adjust the height as per your requirement
            }}>
                <div style={{ paddingTop: "100px", }}></div>

                <Carousel swipeable={true} autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
                    {
                        carouselData.map((item) => (
                            <div key={item.id} className="temp">
                                <div className="frame">
                                    <div className="overlap">
                                        <div className="overlap-2">
                                            {/* Check if the image data exists before trying to display it */}

                                            <img
                                                className="img"
                                                src={`http://localhost:1337${item.attributes.Image.data.attributes.url}`}
                                                alt={item.attributes.Title}
                                            />

                                            <div className="text-wrapper-2">{item.attributes.Title}</div>
                                            <p className="ipsom-lorens-kcdwocn">{item.attributes.Description}</p>
                                            <div className="element-jan">
                                                <div className="rectangle" />
                                                {item.attributes.Date}
                                            </div>
                                        </div>
                                        <div className="be-ready-at">Be Ready At</div>
                                    </div>
                                </div>
                            </div>
                        ))}





                </Carousel>
                <div style={{ paddingBottom: "50px" }}></div>


            </main>
            <Memo />
            <Social />

            <Footer />
        </>
    );
}

export default NavScrollExample;