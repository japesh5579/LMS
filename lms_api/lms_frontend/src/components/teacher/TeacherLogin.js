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

    // Animation styles
    const fadeInAnimation = {
        animation: 'fadeIn 1.5s ease-in-out',
    };

    const errorStyle = {
        animation: 'fadeIn 0.5s ease-in-out',
        marginTop: '10px',
        color: '#ff4d4f',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    const containerStyle = {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
    };

    const imageSectionStyle = {
        flex: 1,
        backgroundImage: `url('https://images.unsplash.com/photo-1593642634443-44adaa06623a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGVkdWNhdGlvbnxlbnwwfHx8fDE2OTc2ODc0Mjg&ixlib=rb-1.2.1&q=80&w=1920')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const formSectionStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        padding: '50px',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '400px',
    };

    const titleStyle = {
        fontSize: '1.4rem', // Reduced font size
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        marginTop: '30px', 
        color: '#2c3e50',
    };

    const styles = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .btn-primary:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }
    `;

    useEffect(() => {
        // Inject the keyframes into the document head
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Check if the teacher is already logged in and redirect them
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
        if (teacherLoginStatus === 'true') {
            navigate('/teacher-dashboard/');
        }
        document.title = 'Teacher Login';

        return () => {
            // Cleanup the injected style element on unmount
            document.head.removeChild(styleSheet);
        };
    }, [navigate]);

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();

        const teacherFormData = {
            email: teacherLoginData.email,
            password: teacherLoginData.password,
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

    return (
        <div style={containerStyle}>
            <div style={imageSectionStyle}></div>
            <div style={formSectionStyle}>
                <div style={cardStyle} className="card" style={fadeInAnimation}>
                    {/* Icon Above the Title */}
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src="teacher.png" // Replace with your icon URL
                            alt="Icon"
                            style={{ width: '150px', marginBottom: '20px' , marginTop: '35px' }} // Adjust the icon size and spacing
                        />
                    </div>

                    <h1 style={titleStyle}>Login</h1>
                    <div className="card-body">
                        {errorMsg && <p style={errorStyle}>{errorMsg}</p>}
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
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
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
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
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;
