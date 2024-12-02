import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
const baseUrl = 'http://127.0.0.1:8000/api';

function CategoryCourses(){
    const [courseData, setcourseData] = useState([]);
    const {category_slug}=useParams()
    useEffect(() => {
        document.title = `Courses - ${category_slug}`;
        try {
            axios.get(`${baseUrl}/course/?category=${category_slug}`)
                .then((res) => {
                    setcourseData(res.data); 
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [category_slug]);
    return(
        <div className='container mt-3 '>
        {/* Latest Courses */}
        <h3 className=" pb-1 mb-4">{category_slug}</h3>
        <div className="row">
        {courseData && courseData.map((course,index)=>(
            <motion.div className="col-md-3 mb-4"
                 whileHover={{ scale: 1.05, boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}
                 transition={{ type: "spring", stiffness: 300 }}>
                <div className="cardshadow-sm h-100" style={{ borderRadius: "15px", overflow: "hidden" }} >
                <Link to={'/detail/'+course.id}><img src={course.featured_img} className="card-img-top img-fluid"
                alt={course.title} style={{ borderRadius: "15px 15px 0 0", transition: "all 0.3s ease-in-out" }}/></Link>
                    <div className="card-body text-center">
                    <h5 className="card-title"><Link to={'/detail/'+course.id}className="text-dark" style={{ fontWeight: "600" }}>{course.title}</Link></h5>
                    </div>
                </div>
            </motion.div>
           ) )}
        
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

export default CategoryCourses;