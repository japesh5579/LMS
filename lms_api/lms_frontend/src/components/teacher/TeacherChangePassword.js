import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherChangePassword() {
    const [teacherData, setTeacherData] = useState({
        password: '',
    });
    const teacherId = localStorage.getItem('teacherId');

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault(); // Prevent page reload

        // Prepare the data to send
        const teacherFormData = {
            password: teacherData.password
        };

        axios
            .post(`${baseUrl}/teacher/change-password/${teacherId}/`, teacherFormData, {
                headers: {
                    'Content-Type': 'application/json', // Correct content type for JSON
                },
            })
            .then((response) => {
                Swal.fire({
                    title: 'Password Updated!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setTeacherData({ password: '' }); // Clear the password field after success
            })
            .catch((error) => {
                console.error("Error updating password:", error);
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.error || 'Unable to update password.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    useEffect(() => {
        document.title = 'Change Password';
    }, []); // Empty dependency array to run only once

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus !== 'true') {
        window.location.href = '/teacher-login';
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="password" // Change to password type
                                        value={teacherData.password} 
                                        onChange={handleChange} 
                                        name="password" 
                                        className="form-control" 
                                        id="inputPassword" 
                                    />
                                </div>
                            </div>
                            <hr />
                            <button onClick={submitForm} className='btn btn-primary'>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherChangePassword;