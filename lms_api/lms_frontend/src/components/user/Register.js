import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register() {
    const [StudentData, setStudentData] = useState({
        full_name: '',
        email: '',
        password: '',
        username: '',
        interests: '',
        status: '', 
    });

    const [errorMessages, setErrorMessages] = useState({}); // For field validation errors

    // Handle input changes
    const handleChange = (event) => {
        setStudentData({
            ...StudentData,
            [event.target.name]: event.target.value,
        });
    };

    // Validate fields before submission
    const validateFields = () => {
        const errors = {};
        if (!StudentData.full_name) errors.full_name = 'Full Name is required';
        if (!StudentData.email) errors.email = 'Email is required';
        if (!StudentData.password) errors.password = 'Password is required';
        if (!StudentData.interests) errors.interests = 'interests is required';
        if (!StudentData.username) errors.username = 'Mobile Number is required';
        return errors;
    };

    // Submit form
    const submitForm = (event) => {
        event.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }
        setErrorMessages({}); // Clear errors if validation passes

        const studentFormData = {
            full_name: StudentData.full_name,
            email: StudentData.email,
            password: StudentData.password,
            username: StudentData.username,
            interests: StudentData.interests,
        };

        axios
            .post(baseUrl, studentFormData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
                setStudentData({
                    full_name: '',
                    email: '',
                    password: '',
                    interests: '',
                    username: '',
                    status: 'success',
                });
            })
            .catch((error) => {
                console.error(error.response?.data || error.message);
                setStudentData((prevState) => ({
                    ...prevState,
                    status: 'error',
                }));
            });
    };

    useEffect(()=>{
        document.title="Student Register"
    });

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
     if(studentLoginStatus==='true'){
        window.location.href = '/user-dashboard';
     }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {StudentData.status === 'success' && (
                        <p className="text-success">Thanks for your registration!</p>
                    )}
                    {StudentData.status === 'error' && (
                        <p className="text-danger">Something went wrong. Please try again.</p>
                    )}

                    <div className="card">
                        <h5 className="card-header">Student Register</h5>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">
                                        Full Name
                                    </label>
                                    <input
                                        value={StudentData.full_name}
                                        onChange={handleChange}
                                        name="full_name"
                                        type="text"
                                        className="form-control"
                                        id="full_name"
                                    />
                                    {errorMessages.full_name && (
                                        <div className="text-danger">{errorMessages.full_name}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        value={StudentData.email}
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="email"
                                    />
                                    {errorMessages.email && (
                                        <div className="text-danger">{errorMessages.email}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        value={StudentData.password}
                                        onChange={handleChange}
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                    />
                                    {errorMessages.password && (
                                        <div className="text-danger">{errorMessages.password}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        value={StudentData.username}
                                        onChange={handleChange}
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        id="username"
                                    />
                                    {errorMessages.username && (
                                        <div className="text-danger">{errorMessages.username}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interests" className="form-label">
                                        Interests
                                    </label>
                                    <textarea
                                        value={StudentData.interests}
                                        onChange={handleChange}
                                        name="interests"
                                        className="form-control"
                                        id="interests"
                                    />
                                    <div id="interestsHelp" className="form-text">
                                        e.g., PHP, Python, JavaScript
                                    </div>
                                    {errorMessages.interests && (
                                        <div className="text-danger">{errorMessages.interests}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;