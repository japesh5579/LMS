import { Link } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddCourses() {
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        f_img: '',
        techs: '',
    });
    const [categories, setCategories] = useState([]);// categories=cats;setcatogries=setcats

    useEffect(() => {
        document.title = 'Add Courses';
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
    }, []);

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
        _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        try {
            axios.post(baseUrl+'/course/', _formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                window.location.href = '/add-courses';
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Course</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="category" className="col-sm-2 col-form-label">
                                    Category
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        name="category"
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
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Technologies
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
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

export default AddCourses;