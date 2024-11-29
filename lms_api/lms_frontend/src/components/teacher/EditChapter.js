import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function EditChapter(){
    const [chapterData, setChapterData] = useState({
        course:'',
        title: '',
        description: '',
        prev_video:'',
        video: '',
        remarks: '',
    });
  //  const [categories, setCategories] = useState([]);// categories=cats;setcatogries=setcats

    useEffect(() => {
        document.title = 'Update Chapter';
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
    const {chapter_id}=useParams();
    const formSubmit = () =>  {
        const _formData = new FormData();
        
        _formData.append('course',chapterData.course); 
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        if(chapterData.video!==''){
            _formData.append('video', chapterData.video, chapterData.video.name);
        }
        _formData.append('remarks', chapterData.remarks);

        try {
            axios.put(baseUrl+'/chapter/'+chapter_id+'/', _formData, {
                headers: {
                   'Content-Type' : 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status==200){
                Swal.fire({
                    title:'Data has been updated',
                    text:'success',
                    icon:'success',
                    timer:3000,
                    position:'top-right',
                    showConfirmButton:false,
                });
            }
            });
        } catch (error) {
            console.error('Error occurred during PUT request:', error.response ? error.response.data : error.message);
        }
    };
    useEffect(() => {
        try {
            axios.get(baseUrl+'/chapter/'+chapter_id+'/')
                .then((res) => {
                    setChapterData({
                        course:res.data.course,
                        title:res.data.title,
                        description:res.data.description,
                        prev_video:res.data.video,
                        remarks:res.data.remarks,
                        video:'',
                    }); // Updated to set categories properly
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [chapter_id]);
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Update Chapter</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                <input type="text" value={chapterData.title} onChange={handleChange} name='title' id="title" className="form-control"  />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        value={chapterData.description}
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
                                {chapterData.prev_video && (
                                    <video controls width="100%" className="mt-2">
                                        <source src={chapterData.prev_video} type="video/webm" />
                                        <source src={chapterData.prev_video} type="video/mp4" />
                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                )}

                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Remarks
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        value={chapterData.remarks}
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

export default EditChapter;