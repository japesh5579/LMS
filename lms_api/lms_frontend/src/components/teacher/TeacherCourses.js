import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherCourses(){
    const [courseData,setCourseData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    console.log(teacherId);

    useEffect(() => {
        document.title = 'Teacher Courses';
        try {
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
                .then((res) => {
                    setCourseData(res.data); // Updated to set categories properly
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [teacherId]);


    console.log(courseData);


    return(
        <div className='container mt-4' 
        style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='card'style={{ borderRadius: '8px' }}>
                        <h5 className='card-holder'
                        style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000000', padding: '10px 0' }}
                        >My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered' 
                            style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course,index)=> 
                                    <tr key={index}>
                                        <td><Link to={"/all-chapters/"+ course.id} style={{ textDecoration: 'none', color: 'black' }}>{course.title}</Link></td>
                                        <td><img src={course.featured_img } width='80' className='rounded' alt={course.title}style={{ objectFit: 'cover', borderRadius: '5px' }} /></td>
                                        <td>123</td>
                                        <td>
                                            <Link className='btn btn-info btn-sm text-white' to={'/edit-course/'+ course.id}style={{ marginRight: '5px', borderRadius: '5px', padding: '5px 10px' }}>Edit</Link>
                                            <Link className='btn btn-success btn-sm ms-2' to={'/add-chapter/'+ course.id}style={{ marginRight: '5px', borderRadius: '5px', padding: '5px 10px' }}>Add Chapter</Link>
                                            <button className='btn btn-danger btn-sm ms-2'style={{ borderRadius: '5px', padding: '5px 10px' }}>Delete</button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherCourses;