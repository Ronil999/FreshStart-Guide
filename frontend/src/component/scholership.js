import React, { useState, useEffect } from 'react';
// import { Table } from 'react-bootstrap';
import './scholarship.css';


const Scholarship = () => {
    const [scholarshipdata, setScholarshipData] = useState([]);

    useEffect(() => {
        // Fetch data from the API using the provided URL and API key
        const apiUrl = 'http://localhost:1337/api/scholarships';
        const apiKey = '2c41904f2352f569fb35194baa3f35ca400de85cb42aeb3fe7c1db02f01851670bc6f675a3d39fe5cd2258f5b0416669c79c260d05100fb6e568870fc8df35041286f309d25da6e623ea45f8fa36066a00e58915fdb56188c12351f1cd973a8fc194f0f1caf500ab62e39b54a063f986515ff5e935946977b3ac01f812b91166';

        fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }).then((response) => response.json()).then(data => setScholarshipData(data.data))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to ensure this effect runs once when the component mounts
    console.log(scholarshipdata);
    return (
        <div>
            

            <div className="container" style={{ marginTop: '0px' }}>
                <div className='table-container' style={{ marginTop: '100px' }} >
                    <h2 style={{ color: 'white' }}>Scholarships</h2>
                    <table >
                        <thead >
                            <tr className="table-header">
                                <th style={{width:"2%"}}>No.</th>
                                <th style={{width:"10%"}}>Scholarship Name</th>
                                <th >Scholarship Details</th>
                                <th style={{width:"10%"}}>Scholarship Link</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                (Array.isArray(scholarshipdata)) ?
                                    scholarshipdata.map((scholarship, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td >{scholarship.attributes.Name}</td>
                                            <td style={{textAlign:"justify"}}>{scholarship.attributes.Detail}</td>
                                            <td>
                                                <a href={scholarship.attributes.Link} style={{textDecoration:'none',fontWeight:'500',color:'blue'}}target="_blank" rel="noopener noreferrer">
                                                    {scholarship.attributes.Link}
                                                </a>
                                            </td>
                                        </tr>
                                    )) : <tr>no data found</tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Scholarship;