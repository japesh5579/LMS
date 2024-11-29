import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/student-login/';

function Login() {
    const [studentLoginData, setstudentLoginData] = useState({
        email: '',
        password: '',
    });
    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setstudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault(); // Prevent form default submission behavior
        const studentFormData = {
            email: studentLoginData.email,
            password: studentLoginData.password,
        };

        axios
            .post(baseUrl, studentFormData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
                console.log('Login Response:', res.data);  // Debugging the response
                if (res.data.bool === true) {
                    localStorage.setItem('studentLoginStatus', true);
                    localStorage.setItem('studentId', res.data.student_id);
                    window.location.href = '/user-dashboard';
                } else {
                    seterrorMsg('Invalid Email or Password');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    seterrorMsg(error.response.data.error || 'Invalid Email or Password');
                } else {
                    seterrorMsg('Something went wrong. Please try again.');
                }
                console.error('Error Response:', error.response ? error.response.data : error.message);
            });
    };

    useEffect(() => {
        document.title = 'Student Login';

        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if (studentLoginStatus === 'true') {
            window.location.href = '/user-dashboard';
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}

                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        value={studentLoginData.email}
                                        name="email"
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        value={studentLoginData.password}
                                        name="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="exampleInputPassword1"
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

export default Login;
