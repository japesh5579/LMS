import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const baseUrl = 'http://127.0.0.1:8000/api';

function Home() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        document.title = 'KnowledgeNest';
        try {
            axios.get(baseUrl + '/course/?result=4')
                .then((res) => {
                    setCourseData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?technology,education')`, 
        backgroundSize: 'cover', 
        backgroundcolor: 'black', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh', 
        width: '100%',
        color: 'black', 
        padding: '50px 20px',
    };

    return (
        <div style={backgroundImageStyle}>
            <div className="container mt-4" style={{
                backgroundColor: "#f8f9fa",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
            }}>
                {/* Latest Courses */}
                <h3 className="pb-1 mb-4 d-flex justify-content-between align-items-center" style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Latest Courses
                    <Link to="/all-courses" 
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#007bff",
                            textDecoration: "none",
                            transition: "color 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.color = "#007bff")}>
                        See All
                    </Link>
                </h3>
                <div className="row">
                    {courseData && courseData.map((course, index) => (
                        <motion.div
                            className="col-md-3 mb-4"
                            key={course.id}
                            whileHover={{ scale: 1.05, boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}
                            transition={{ type: "spring", stiffness: 300 }}>
                            <div className="card shadow-sm h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                                <Link to={'/detail/' + course.id}>
                                    <img 
                                        src={course.featured_img} 
                                        className="card-img-top img-fluid" 
                                        alt={course.title}
                                        style={{ borderRadius: "15px 15px 0 0", transition: "all 0.3s ease-in-out" }} />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to={'/detail/' + course.id} className="text-dark" style={{ fontWeight: "600" }}>
                                            {course.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* End Latest Courses */}

                {/* Popular Courses */}
                <h3 className="pb-1 mb-4 d-flex justify-content-between align-items-center" style={{ fontSize: "24px", fontWeight: "bold" }}>
                    Popular Courses
                    <Link to="/popular-courses" 
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#007bff",
                            textDecoration: "none",
                            transition: "color 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.color = "#007bff")}>
                        See All
                    </Link>
                </h3>
                <div className="row">
                    {[...Array(4)].map((_, index) => (
                        <motion.div
                            className="col-md-3 mb-4"
                            key={index}
                            whileHover={{ scale: 1.05, boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}
                            transition={{ type: "spring", stiffness: 300 }}>
                            <div className="card shadow-sm h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                                <Link to="/detail/1">
                                    <img src="qq.jpg" className="card-img-top img-fluid" alt="Popular Course" style={{ borderRadius: "15px 15px 0 0" }} />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to="/detail/1" className="text-dark" style={{ fontWeight: "600" }}>Course Title</Link>
                                    </h5>
                                </div>
                                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                                    <span>Rating: 4/5</span>
                                    <span className="float-end">Views: 4.5k</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* End Popular Courses */}

                {/* Popular Teachers */}
                <h3 className="pb-1 mb-4 d-flex justify-content-between align-items-center" style={{ fontSize: "24px", fontWeight: "bold", marginTop: "40px" }}>
                    Popular Teachers
                    <Link to="/popular-teacher" 
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#007bff",
                            textDecoration: "none",
                            transition: "color 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.color = "#007bff")}>
                        See All
                    </Link>
                </h3>
                <div className="row">
                    {[...Array(4)].map((_, index) => (
                        <motion.div
                            className="col-md-3 mb-4"
                            key={index}
                            whileHover={{ scale: 1.05, boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}
                            transition={{ type: "spring", stiffness: 300 }}>
                            <div className="card shadow-sm h-100" style={{ borderRadius: "15px", overflow: "hidden" }}>
                                <Link to="/teacher-detail/1">
                                    <img src="ss.jpg" className="card-img-top img-fluid" alt="Teacher" style={{ borderRadius: "15px 15px 0 0" }} />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link to="/teacher-detail/1" className="text-dark" style={{ fontWeight: "600" }}>Teacher Name</Link>
                                    </h5>
                                </div>
                                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                                    <span>Rating: 4/5</span>
                                    <span className="float-end">Views: 4.5k</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* End Popular Teachers */}

                {/* Student Testimonials */}
                <h3 className="pb-1 mb-4" style={{ fontSize: "24px", fontWeight: "bold", marginTop: "40px" }}>Student Testimonials</h3>
                <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>"This platform is amazing! I learned so much from the courses. The teachers are very knowledgeable!"</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Jane Doe, <cite title="Source Title">Software Engineer</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>"A life-changing experience. Highly recommend this platform to everyone."</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    John Smith, <cite title="Source Title">Web Developer</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>"The best decision I made for my career. The learning process was both fun and informative!"</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Sarah Lee, <cite title="Source Title">UX/UI Designer</cite>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* End Testimonials */}
            </div>
        </div>
    );
}

export default Home;
