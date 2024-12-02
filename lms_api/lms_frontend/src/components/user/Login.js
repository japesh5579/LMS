import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirect after login

const baseUrl = 'http://127.0.0.1:8000/api/student-login/';

function Login() {
    const [studentLoginData, setstudentLoginData] = useState({
        email: '',
        password: '',
    });
    const [errorMsg, seterrorMsg] = useState('');
    const navigate = useNavigate();  // Hook for redirection after successful login

    // Handle form input changes
    const handleChange = (event) => {
        setstudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value,
        });
    };

    // Submit the login form
    const submitForm = (event) => {
        event.preventDefault(); // Prevent form default submission behavior
    
        // Basic validation to check if both fields are filled
        if (!studentLoginData.email || !studentLoginData.password) {
            seterrorMsg("Please enter both email and password.");
            return;
        }
    
        const studentFormData = {
            email: studentLoginData.email,
            password: studentLoginData.password,
        };
    
        // Axios POST request to backend API
        axios
            .post(baseUrl, studentFormData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => {
                console.log('Login Response:', res.data);  // Debugging the response
                // Check if login is successful
                if (res.data.bool === true) {
                    localStorage.setItem('studentLoginStatus', 'true'); // Store login status
                    localStorage.setItem('studentId', res.data.student_id); // Store student ID
                    navigate('/user-dashboard/'); // Redirect to user dashboard
                } else {
                    seterrorMsg('Invalid Email or Password');  // Invalid credentials
                }
            })
            .catch((error) => {
                // Handle error response
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    seterrorMsg(error.response.data.error || 'Invalid Email or Password');
                } else if (error.request) {
                    console.error('Error request:', error.request);
                    seterrorMsg('No response from server.');
                } else {
                    console.error('Error message:', error.message);
                    seterrorMsg('Something went wrong. Please try again.');
                }
            });
    };
    

    useEffect(() => {
        document.title = 'Student Login'; // Set page title

        // Check if user is already logged in
        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if (studentLoginStatus === 'true') {
            navigate('/user-dashboard/');  // Redirect to user dashboard if logged in
        }
    }, [navigate]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {/* Display error message if any */}
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
