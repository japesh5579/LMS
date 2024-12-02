import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";

const baseUrl = 'http://127.0.0.1:8000/api';

function AllCourses() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        document.title = 'All Courses';
        try {
            axios.get(baseUrl + '/course/')
                .then((res) => {
                    setCourseData(res.data); // Updated to set categories properly
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, []);

    return (
        <div className='container mt-3'>
            {/* Latest Courses */}
            <h3 className="pb-1 mb-4">Latest Courses</h3>
            <div className="row mb-4">
                {courseData && courseData.map((course, index) =>
                    <motion.div 
                        className="col-md-3 mb-4" 
                        key={course.id}
                        whileHover={{ scale: 1.05, boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <div className="card shadow-sm h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                            <Link to={'/detail/' + course.id}>
                                <img
                                    src={course.featured_img}
                                    className="card-img-top"
                                    alt={course.title}
                                    style={{ borderRadius: "15px 15px 0 0", transition: "all 0.3s ease-in-out" }}
                                />
                            </Link>
                            <div className="card-body text-center" style={cardBodyStyle}>
                                <h5 className="card-title">
                                    <Link to={'/detail/' + course.id} className="text-dark" style={{ fontWeight: "600" }}>{course.title}</Link>
                                </h5>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            {/* End Latest Courses */}

            {/* Pagination start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
            {/* Pagination end */}
        </div>
    );
}

// Inline Styles
const cardStyle = {
    border: 'none',
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imgStyle = {
    transition: 'transform 0.3s ease-in-out',
};

const cardBodyStyle = {
    padding: '20px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    transition: 'color 0.3s ease',
};

// Hover Effects using JavaScript
const hoverCardStyle = {
    transform: 'translateY(-10px) scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
};

const hoverImgStyle = {
    transform: 'scale(1.1)', // Zoom effect on hover
};

const hoverCardBodyStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Light background change
};

const hoverLinkStyle = {
    color: '#007bff', // Change color to blue on hover
};

// To apply hover effect, use event listeners in the component
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = hoverCardStyle.transform;
            card.style.boxShadow = hoverCardStyle.boxShadow;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});

export default AllCourses;
