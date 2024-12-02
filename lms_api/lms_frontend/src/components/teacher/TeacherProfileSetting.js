//import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from './TeacherSidebar';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherProfileSetting(){
    const [teacherData, setteacherData] = useState({
        full_name: '',
        email: '',
        qualification: '',
        mobile_no: '',
        skills: '',
        profile_img:'',
        p_img:'',
        'verify_status': '', // Tracks form submission status


    });
    const teacherId=localStorage.getItem('teacherId');

    useEffect(() => {
    
        axios
          .get(`${baseUrl}/teacher/${teacherId}`)
          .then((res) => {
            setteacherData({
                full_name: res.data.full_name,
                email: res.data.email,
                qualification: res.data.qualification,
                mobile_no:res.data.mobile_no,
                skills: res.data.skills,
                profile_img:res.data.profile_img,
                p_img:'',
                verify_status:''
            })
          })
          .catch((error) => {
            console.error("Error fetching course data:", error);
          });
      }, [teacherId]);

    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };


    const handleFileChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0],
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('full_name', teacherData.full_name);
        formData.append('email', teacherData.email);
        formData.append('qualification', teacherData.qualification);
        formData.append('mobile_no', teacherData.mobile_no);
        formData.append('skills', teacherData.skills);
        formData.append('verify_status', teacherData.verify_status);
        
        // Append profile image if exists
        if (teacherData.p_img) {
            formData.append('profile_img', teacherData.p_img);
        }
    
        axios
            .put(`${baseUrl}/teacher/${teacherId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                Swal.fire({
                    title: 'Profile Updated!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Unable to update profile.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };
    
    
    
        

    useEffect(()=>{
        document.title='Profile Setting';
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus !== 'true') {
        window.location.href = '/teacher-login';
    }
    

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='card'
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <h5 className='card-header'
                        style={{
                            backgroundColor: '#343a40',
                            color: '#fff',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            padding: '15px'
                        }}>Profile Setting</h5>
                        <div className='card-body' style={{ padding: '20px' }}>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                <input type="text" value={teacherData.full_name} name="full_name" onChange={handleChange} 
                                className="form-control" id="staticEmail"
                                style={{ padding: '10px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                <input type="text" value={teacherData.email} name="email" onChange={handleChange}
                                className="form-control" id="staticEmail"
                                style={{ padding: '10px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="col-sm-2 col-form-label">Porfile Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        name='p_img'
                                        className="form-control"
                                        id="video"
                                        style={{ padding: '10px', fontSize: '1rem' }}
                                    />
                                    {teacherData.profile_img &&
                                    <p className='mt-2'>
                                        <img src={teacherData.profile_img} 
                                        width="300" 
                                        alt={teacherData.full_name}
                                        style={{ borderRadius: '8px', marginTop: '10px' }}
                                        /></p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Skills
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        value={teacherData.skills} 
                                        onChange={handleChange}
                                        name="skills"
                                        className="form-control"
                                        id="inputInterests"
                                        rows="2"
                                        style={{ padding: '10px', fontSize: '1rem' }}
                                    ></textarea>
                                    <div id="emailHelp" className="form-text">
                                        Php, Python, Javascript, etc
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputInterests" className="col-sm-2 col-form-label">
                                    Qualification
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        value={teacherData.qualification}
                                        onChange={handleChange} 
                                        name="qualification"
                                        className="form-control"
                                        id="inputInterests"
                                        rows="2"
                                        style={{ padding: '10px', fontSize: '1rem' }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                <input type="text" value={teacherData.full_name} name="full_name" onChange={handleChange} 
                                className="form-control" id="staticEmail"
                                style={{ padding: '10px', fontSize: '1rem' }} />
                                </div>
                            </div>
                            <hr/>
                            <button onClick={submitForm} className='btn btn-primary'style={{ padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold' }}>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherProfileSetting;