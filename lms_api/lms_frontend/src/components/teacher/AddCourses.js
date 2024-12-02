//import { Link } from 'react-router-dom';
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
        //const teacherId=localStorage.getItem('teacherId');
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', localStorage.getItem('teacherId')); // Replace with dynamic teacher ID
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        console.log([..._formData.entries()]) ;
        try {
            axios.post(baseUrl+'/course/', _formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log("Course added successfully:", res.data);
                window.location.href = '/add-courses';
            });
        } catch (error) {
            console.log(error);
        }
        console.log([..._formData.entries()]);

    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card' style={{
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'
                    }}>
                        <h5 className='card-header' style={{
                            backgroundColor: '#343a40',
                            color: '#fff',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            padding: '10px 15px'
                        }}>Add Course</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="category" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                                    Category
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        name="category"
                                        onChange={handleChange}
                                        id="category"
                                        className="form-control"
                                        required
                                        style={{
                                            borderRadius: '5px',
                                            borderColor: '#ddd',
                                            padding: '8px'
                                        }}
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
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Title</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name='title'
                                        className="form-control"
                                        id="title"
                                        style={{
                                            borderRadius: '5px',
                                            borderColor: '#ddd',
                                            padding: '8px'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        onChange={handleChange}
                                        name='description'
                                        id="description"
                                        rows="3"
                                        style={{
                                            borderRadius: '5px',
                                            borderColor: '#ddd',
                                            padding: '8px'
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="f_img" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>Featured Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        name='f_img'
                                        className="form-control"
                                        id="f_img"
                                        style={{
                                            borderRadius: '5px',
                                            borderColor: '#ddd',
                                            padding: '8px'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="techs" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                                    Technologies
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                        onChange={handleChange}
                                        name='techs'
                                        placeholder='Php, Python, Javascript, HTML, CSS, etc.'
                                        id="techs"
                                        rows="2"
                                        style={{
                                            borderRadius: '5px',
                                            borderColor: '#ddd',
                                            padding: '8px'
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <hr />
                            <button type='button' onClick={formSubmit} 
                            className='btn btn-primary'
                            style={{
                                padding: '10px 20px',
                                fontSize: '1rem',
                                borderRadius: '5px',
                                border: 'none'
                            }}
                            >Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddCourses; 