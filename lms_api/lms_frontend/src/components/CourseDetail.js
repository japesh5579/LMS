import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";
const siteUrlUrl = process.env.REACT_APP_SITE_URL || "http://127.0.0.1:8000/";

function CourseDetail() {
  const [chapterData, setChapterData] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [teacherData, setTeacherData] = useState({});
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(null);
  const [status, setStatus] = useState("loading"); 
  const [error, setError] = useState(null);

  const { course_id } = useParams();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    document.title = "Course Details";

    // Fetch data in parallel
    const fetchCourseData = axios.get(`${baseUrl}/course/${course_id}`);
    const fetchEnrollStatus = axios.get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`);

    Promise.all([fetchCourseData, fetchEnrollStatus])
      .then(([courseRes, enrollRes]) => {
        const course = courseRes.data;
        setCourseData(course);
        setChapterData(course.course_chapters || []);
        setTeacherData(course.teacher || {});
        setRelatedCourseData(JSON.parse(course.related_videos || "[]"));
        setTechListData(course.tech_list || []);
        setEnrollStatus(enrollRes.data.status === "enrolled" ? "success" : "not_enrolled");
        setStatus("success");
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load course data. Please try again later.");
        setStatus("error");
      });
  }, [course_id, studentId]);

  useEffect(() => {
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    setUserLoginStatus(studentLoginStatus === "true");
  }, []);

  const enrollCourse = () => {
    if (!userLoginStatus) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please log in to enroll in the course",
        showConfirmButton: false,
        timer: 3000,
        width: "250px",
        padding: "0.5rem",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("course", course_id);
    formData.append("student", studentId);
  
    axios
      .post(`${baseUrl}/student-enroll-course/`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Enrollment Successful!",
          text: "You are now enrolled in this course.",
          showConfirmButton: false,
          timer: 3000,
        });
        // Save the enrollment status in localStorage
        localStorage.setItem(`/enrollStatus_${course_id}`, "success");
        setEnrollStatus("success");
      })
      .catch((err) => {
        console.error("Enrollment failed:", err);
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div className="alert alert-danger">{error}</div>;

  const { title, description, featured_img } = courseData;

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={featured_img || ""}
            className="img-thumbnail"
            alt="Course Thumbnail"
          />
        </div>
        <div className="col-8">
          <h3>{title || "Course Title"}</h3>
          <p>{description || "Course description not available."}</p>
          {/*<p className="fw-bold">Techs: {techs || "N/A"}</p>*/}
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/teacher-detail/${teacherData.id || "#"}`}>
              {teacherData.full_name || "Unknown Teacher"}
            </Link>
          </p>
          <p className="fw-bold">
            Technologies:{" "}
            {techListData.length ? (
              techListData.map((tech, index) => (
                <Link
                  key={index}
                  to={`/category/${tech.trim()}`}
                  className="badge badge-pill text-dark bg-warning me-2"
                >
                  {tech.trim()}
                </Link>
              ))
            ) : (
              <span className="badge badge-pill text-dark bg-secondary">No technologies listed</span>
            )}
          </p>
          <p className="fw-bold">Duration: 3 hours 30 minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4/5</p>
          {enrollStatus === "success" ? (
            <span>
              Already Enrolled
              </span>
          ) : userLoginStatus ? (
            <button onClick={enrollCourse} className="btn btn-success">
              Enroll in this Course
            </button>
          ) : (
            <Link to="/user-login" className="btn btn-warning">
  Log in to Enroll
</Link>

          )}
        </div>
      </div>
 {/* Course Chapters / Videos */}
 <div className="card mt-4">
        <h5 className="card-header">In this Course</h5>
        <ul className="list-group list-group-flush">
          {chapterData.length === 0 ? (
            <li className="list-group-item">No chapters available.</li>
          ) : (
            chapterData.map((chapter, index) => (
              <li className="list-group-item" key={chapter.id || index}>
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
                            <source src={chapter.video} type="video/webm" />
                            <source src={chapter.video} type="video/mp4" />
                            Sorry, your browser doesn't support embedded
                            videos.
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
        {relatedCourseData.map((rcourse) => (
          <div className="col-md-3" key={rcourse.pk}>
            <div className="card">
              <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                <img
                  src={`${siteUrlUrl}media/${rcourse.fields.featured_img}`}
                  className="card-img-top"
                  alt={rcourse.fields.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                    {rcourse.fields.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;