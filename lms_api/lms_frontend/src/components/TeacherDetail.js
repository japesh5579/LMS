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
        document.title = 'Course Details';
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
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src="/logo512.png" className="img-thumbnail" alt="Teacher" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className="fw-bold">Skills:
                        {skillList.map((skill, index) => (
                            <Link
                                key={index}
                                to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                                className="badge badge-pill text-dark bg-warning me-2"
                            >
                                {skill.trim()}
                            </Link>
                        ))}
                    </p>
                    <p className="fw-bold">Recent Course: <Link to="/category/reactjs">ReactJs Course</Link></p>
                    <p className="fw-bold">Rating: 4/5</p>
                </div>
            </div>

            <div className="card mt-4">
                <h5 className="card-header">Course List</h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index) => (
                        <Link
                            key={index}
                            to={`/detail/${course.id}`}
                            className="list-group-item list-group-item-action"
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
