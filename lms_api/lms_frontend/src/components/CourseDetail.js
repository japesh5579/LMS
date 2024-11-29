import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";
const siteUrlUrl = "http://127.0.0.1:8000/";

function CourseDetail() {
  const [chapterData, setChapterData] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [teacherData, setTeacherData] = useState({});
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  let { course_id } = useParams();

  useEffect(() => {
    document.title = "Course Details";

    axios
      .get(`${baseUrl}/course/${course_id}`)
      .then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters || []);
        setTeacherData(res.data.teacher || {});
        setRelatedCourseData(JSON.parse(res.data.related_videos || "[]"));
        setTechListData(res.data.tech_list || []);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [course_id]);

  // Enroll in Course
  const enrollCourse = () => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be logged in to enroll!",
      });
      return;
    }

    const _formData = new FormData();
    _formData.append("course", courseData.id); // Ensure courseData.id exists
    _formData.append("student", studentId);

    axios
      .post(`${baseUrl}/enroll/`, _formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Enrollment Success!",
          text: "You have successfully enrolled in the course.",
        });
      })
      .catch((error) => {
        console.error("Enrollment error:", error);
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: "There was an issue with your enrollment.",
        });
      });
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img || ""}
            className="img-thumbnail"
            alt="Course Thumbnail"
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title || "Course Title"}</h3>
          <p>{courseData.description || "Course description not available."}</p>
          <p className="fw-bold">Techs: {courseData.techs || "N/A"}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id || "#"}`}>
              {teacherData.full_name || "Unknown Teacher"}
            </Link>
          </p>
          <p className="fw-bold">
            Techs:
            {techListData.map((tech, index) => (
              <Link
                key={index}
                to={`/category/${tech.trim()}`}
                className="badge badge-pill text-dark bg-warning me-2"
              >
                {tech.trim()}
              </Link>
            ))}
          </p>
          <p className="fw-bold">Duration: 3 hours 30 minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4/5</p>
          <p>
            <button onClick={enrollCourse} className="btn btn-success">
              Enroll in this course
            </button>
          </p>
        </div>
      </div>

      {/* Course Chapters */}
      <div className="card mt-4">
        <h5 className="card-header">In this Course</h5>
        <ul className="list-group list-group-flush">
          {chapterData.length === 0 ? (
            <li className="list-group-item">No chapters available.</li>
          ) : (
            chapterData.map((chapter, index) => (
              <li className="list-group-item" key={index}>
                {chapter.title}
                <span className="float-end">
                  <span className="me-3">1 hour 30 mins</span>
                  <button
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#VideoModal${index}`}
                  >
                    <i className="bi bi-youtube"></i>
                  </button>
                </span>

                {/* Video Modal */}
                <div
                  className="modal fade"
                  id={`VideoModal${index}`}
                  tabIndex="-1"
                  aria-labelledby={`VideoModalLabel${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id={`VideoModalLabel${index}`}
                        >
                          Video {index + 1}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {chapter.video?.url ? (
                          <div className="ratio ratio-16x9">
                            <iframe
                              src={chapter.video.url}
                              title={`Video ${index + 1}`}
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : chapter.video ? (
                          <video controls width="100%">
                            <source src={chapter.video} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                          </video>
                        ) : (
                          <p>No video available.</p>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Related Courses */}
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row mb-4">
        {relatedCourseData.length === 0 ? (
          <p>No related courses available at the moment.</p>
        ) : (
          relatedCourseData.map((rcourse, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <Link to={`/detail/${rcourse.pk}`}>
                  <img
                    src={`${siteUrlUrl}media/${rcourse.fields.featured_img}`}
                    className="card-img-top"
                    alt={rcourse.fields.title}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${rcourse.pk}`}>
                      {rcourse.fields.title}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
