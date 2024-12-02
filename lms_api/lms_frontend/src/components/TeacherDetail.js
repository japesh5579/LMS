import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherDetail() {
    const [courseData, setCourseData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [skillList, setSkillList] = useState([]);
    let { teacher_id } = useParams();

    useEffect(() => {
        document.title = 'Teacher Details';
        try {
            axios.get(`${baseUrl}/teacher/${teacher_id}`)
                .then((res) => {
                    console.log(res);
                    setTeacherData(res.data);
                    setCourseData(res.data.teacher_courses);
                    setSkillList(res.data.skill_list);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [teacher_id]);

    return (
        <div className="container mt-3" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="row">
                <div className="col-4">
                    <img
                        src="/logo512.png"
                        className="img-thumbnail"
                        alt="Teacher"
                        style={{
                            borderRadius: "10px",
                            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                            objectFit: "cover"
                        }}
                    />
                </div>
                <div className="col-8">
                    <h3 style={{ fontWeight: "bold", color: "#333" }}>{teacherData.full_name}</h3>
                    <p style={{ color: "#555", lineHeight: "1.5" }}>{teacherData.detail}</p>
                    <p className="fw-bold" style={{ marginBottom: "10px" }}>Skills:
                        {skillList.map((skill, index) => (
                            <Link
                                key={index}
                                to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                                className="badge badge-pill text-dark bg-warning me-2"
                                style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    borderRadius: "20px",
                                    textDecoration: "none"
                                }}
                            >
                                {skill.trim()}
                            </Link>
                        ))}
                    </p>
                    <p className="fw-bold" style={{ color: "#555" }}>
                        Recent Course: <Link to="/category/reactjs" style={{ color: "#007bff", textDecoration: "none" }}>ReactJs Course</Link>
                    </p>
                    <p className="fw-bold" style={{ color: "#555" }}>Rating: <span style={{ color: "#ff9900" }}>4/5</span></p>
                </div>
            </div>

            <div className="card mt-4" style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <h5
                    className="card-header"
                    style={{
                        backgroundColor: "#f8f9fa",
                        color: "#333",
                        fontWeight: "bold",
                        borderBottom: "1px solid #ddd"
                    }}
                >
                    Course List
                </h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index) => (
                        <Link
                            key={index}
                            to={`/detail/${course.id}`}
                            className="list-group-item list-group-item-action"
                            style={{
                                padding: "10px 15px",
                                color: "#333",
                                textDecoration: "none",
                                borderBottom: "1px solid #eee"
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
                        >
                            {course.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeacherDetail;
