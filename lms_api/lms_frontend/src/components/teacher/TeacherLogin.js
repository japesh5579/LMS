import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api/teacher-login/';

function TeacherLogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: '',
        password: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        const teacherFormData = {
            "email": teacherLoginData.email,
            "password": teacherLoginData.password,
        };
    
        axios
            .post(baseUrl, teacherFormData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
                if (res.data.bool === true) {
                    localStorage.setItem('teacherLoginStatus', 'true');
                    localStorage.setItem('teacherId', res.data.teacher_id);
                    navigate('/teacher-dashboard/');
                } else {
                    setErrorMsg('Invalid Email or Password');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMsg(error.response.data.error || 'Invalid Email or Password');
                } else {
                    setErrorMsg('Something went wrong. Please try again.');
                }
                console.error('Error Response:', error.response ? error.response.data : error.message);
            });
    };
    // Check if the teacher is already logged in and redirect them
    useEffect(() => {
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
        if (teacherLoginStatus === 'true') {
            navigate('/teacher-dashboard/');
        }
        document.title = 'Teacher Login';
    }, [navigate]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        value={teacherLoginData.email}
                                        name="email"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        value={teacherLoginData.password}
                                        name="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;
