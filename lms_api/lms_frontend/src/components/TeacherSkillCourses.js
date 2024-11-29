import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherSkillCourses(){
    const [courseData, setcourseData] = useState([]);
    const {skill_name,teacher_id}=useParams()
    useEffect(() => {
        document.title = `Courses - ${skill_name}`;
        try {
            axios.get(baseUrl+'/course/?skill_name='+skill_name+'&teacher='+teacher_id)
                .then((res) => {
                    setcourseData(res.data); 
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [skill_name]);
    return(
        <div className='container mt-3'>
        {/* Latest Courses */}
        <h3 className=" pb-1 mb-4">{skill_name}</h3>
        <div className="row">
        {courseData && courseData.map((course,index)=>
            <div className="col-md-3 mb-4">
                <div className="card" >
                <Link to={'/detail/'+course.id}><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to={'/detail/'+course.id}>{course.title}</Link></h5>
                    </div>
                </div>
            </div>
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

export default TeacherSkillCourses;