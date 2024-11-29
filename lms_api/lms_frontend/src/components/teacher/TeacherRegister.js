import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

function TeacherRegister() {
    const [teacherData, setTeacherData] = useState({
        full_name: '',
        email: '',
        password: '',
        qualification: '',
        mobile_no: '',
        skills: '',
        status: '', // Tracks form submission status
    });

    const [errorMessages, setErrorMessages] = useState({}); // For field validation errors

    // Handle input changes
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };

    // Validate fields before submission
    const validateFields = () => {
        const errors = {};
        if (!teacherData.full_name) errors.full_name = 'Full Name is required';
        if (!teacherData.email) errors.email = 'Email is required';
        if (!teacherData.password) errors.password = 'Password is required';
        if (!teacherData.qualification) errors.qualification = 'Qualification is required';
        if (!teacherData.mobile_no) errors.mobile_no = 'Mobile Number is required';
        if (!teacherData.skills) errors.skills = 'Skills are required';
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

        const teacherFormData = {
            full_name: teacherData.full_name,
            email: teacherData.email,
            password: teacherData.password,
            qualification: teacherData.qualification,
            mobile_no: teacherData.mobile_no,
            skills: teacherData.skills,
        };

        axios
            .post(baseUrl, teacherFormData, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
                setTeacherData({
                    full_name: '',
                    email: '',
                    password: '',
                    qualification: '',
                    mobile_no: '',
                    skills: '',
                    status: 'success',
                });
            })
            .catch((error) => {
                console.error(error.response?.data || error.message);
                setTeacherData((prevState) => ({
                    ...prevState,
                    status: 'error',
                }));
            });
    };

    useEffect(()=>{
        document.title="Teacher Register"
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
     if(teacherLoginStatus=='true'){
        window.location.href = '/teacher-dashboard';
     }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status === 'success' && (
                        <p className="text-success">Thanks for your registration!</p>
                    )}
                    {teacherData.status === 'error' && (
                        <p className="text-danger">Something went wrong. Please try again.</p>
                    )}

                    <div className="card">
                        <h5 className="card-header">Teacher Register</h5>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">
                                        Full Name
                                    </label>
                                    <input
                                        value={teacherData.full_name}
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
                                        value={teacherData.email}
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
                                        value={teacherData.password}
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
                                    <label htmlFor="qualification" className="form-label">
                                        Qualification
                                    </label>
                                    <input
                                        value={teacherData.qualification}
                                        onChange={handleChange}
                                        name="qualification"
                                        type="text"
                                        className="form-control"
                                        id="qualification"
                                    />
                                    {errorMessages.qualification && (
                                        <div className="text-danger">{errorMessages.qualification}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">
                                        Mobile Number
                                    </label>
                                    <input
                                        value={teacherData.mobile_no}
                                        onChange={handleChange}
                                        name="mobile_no"
                                        type="number"
                                        className="form-control"
                                        id="mobile_no"
                                    />
                                    {errorMessages.mobile_no && (
                                        <div className="text-danger">{errorMessages.mobile_no}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">
                                        Skills
                                    </label>
                                    <textarea
                                        value={teacherData.skills}
                                        onChange={handleChange}
                                        name="skills"
                                        className="form-control"
                                        id="skills"
                                    />
                                    <div id="skillsHelp" className="form-text">
                                        e.g., PHP, Python, JavaScript
                                    </div>
                                    {errorMessages.skills && (
                                        <div className="text-danger">{errorMessages.skills}</div>
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

export default TeacherRegister;
