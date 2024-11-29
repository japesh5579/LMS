import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddChapter(){
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: '',
    });
    const [categories, setCategories] = useState([]);// categories=cats;setcatogries=setcats

    useEffect(() => {
        document.title = 'Add Chapters';
    }, []);

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    };
 
    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    };
    const {course_id}=useParams();
    const formSubmit = () => {
        const _formData = new FormData();
        
        _formData.append('course',course_id); // Replace with dynamic teacher ID
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        _formData.append('video', chapterData.video, chapterData.video.name);
        _formData.append('remarks', chapterData.remarks);

        try {
            axios.post(baseUrl+'/chapter/', _formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                window.location.href = '/add-chapter/1';
            });
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Chapter</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='title' id="title" className="form-control"  />
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
                                        id="description"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="col-sm-2 col-form-label">Video</label>
                                <div className="col-sm-10">
                                <input type="file"  onChange={handleFileChange} name='video' className="form-control" id="video"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Remarks
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control"
                                         onChange={handleChange}
                                        name='remarks'
                                        placeholder='This video is focused on Basic Introduction'
                                        id="remarks"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                            <hr/>
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddChapter;