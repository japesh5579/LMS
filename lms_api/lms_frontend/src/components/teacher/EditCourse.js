import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const baseUrl = 'http://127.0.0.1:8000/api';

function EditCourse() {
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        prev_img:'',
        f_img: '',
        techs: '',
    });
    const [categories, setCategories] = useState([]);// categories=cats;setcatogries=setcats
    const {course_id}=useParams();
    // Fetch categories when page load
    useEffect(() => {
        document.title = 'Edit Course';
        try {
            axios.get(baseUrl+'/category/')
                .then((res) => {
                    setCategories(res.data); // Updated to set categories properly
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }

        // Fetch categories when page load
        try {
            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
                .then((res) => {
                    setCourseData({
                        category:res.data.category,
                        title:res.data.title,
                        description:res.data.description,
                        prev_img:res.data.featured_img,
                        f_img:'',
                        techs:res.data.techs,
                        
                    }); 
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
        //END


    }, [course_id]);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    };
 
    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    };

    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', localStorage.getItem('teacherId')); // Replace with dynamic teacher ID
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if (courseData.f_img !== '') {
            _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        }
        _formData.append('techs', courseData.techs);
    
        try {
            axios.put(baseUrl + '/teacher-course-detail/' + course_id+'/', _formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Data has been updated',
                        text: 'success',
                        icon: 'success', // Changed icon from 'true' to 'success'
                        timer: 3000,
                        position: 'top-right',
                        showConfirmButton: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            }); // Properly closed .catch()
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }; // Properly closed function
    

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Edit Course</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="category" className="col-sm-2 col-form-label">
                                    Category
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        name="category"
                                        value={courseData.category}
                                        onChange={handleChange}
                                        id="category"
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.id}> {/* Adjust `category.id` if needed */}
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        value={courseData.title}
                                        onChange={handleChange}
                                        name='title'
                                        className="form-control"
                                        id="staticEmail"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        value={courseData.description}
                                        onChange={handleChange}
                                        name='description'
                                        id="inputInterests"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="col-sm-2 col-form-label">Featured Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        name='f_img'
                                        className="form-control"
                                        id="video"
                                    />
                                    {courseData.prev_img &&
                                    <p className='mt-2'><img src={courseData.prev_img} width="300"/></p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Technologies
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        value={courseData.techs}
                                        onChange={handleChange}
                                        name='techs'
                                        placeholder='Php, Python, Javascript, HTML, CSS, etc.'
                                        id="inputInterests"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                            <hr />
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
    
export default EditCourse;
