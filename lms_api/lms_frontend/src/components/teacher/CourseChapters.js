import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseChapters() {
    const [chapterData, setchapterData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { course_id } = useParams();

    useEffect(() => {
        document.title = 'Course Chapters';
        try {
            axios.get(baseUrl + '/course-chapters/' + course_id)
                .then((res) => {
                    settotalResult(res.data.length);
                    setchapterData(res.data); // Updated to set categories properly
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }, [course_id]);


    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/chapter/' + chapter_id + '/')
                        .then((res) => {
                            Swal.fire('Success', 'Data has been deleted.');
                            try {
                                // Re-fetch the chapters after deletion
                                axios.get(baseUrl + '/course-chapters/' + course_id)
                                    .then((res) => {
                                        settotalResult(res.data.length);
                                        setchapterData(res.data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            } catch (error) {
                                Swal.fire('Error', 'Data has not been deleted!');
                            }
                        })
                        .catch((error) => {
                            Swal.fire('Error', 'Data could not be deleted!');
                        });
                } catch (error) {
                    Swal.fire('Error', 'Unexpected error!');
                }
            } else {
                Swal.fire('Error', 'Data has not been deleted!');
            }
        });
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>All Chapters({totalResult})<Link className='btn btn-success float-end' to={'/add-chapter/'+course_id}>Add Chapter</Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter) =>
                                        <tr key={chapter.id}>
                                            <td><Link to={"/edit-chapter/" + chapter.id}>{chapter.title}</Link></td>
                                            <td>
                                                <video controls width="100%">
                                                    <source src={chapter.video.url} type='video/webm'></source>
                                                    <source src={chapter.video.url} type='video/mp4'></source>
                                                    Sorry, your browser doesn't support embedded videos.
                                                </video>
                                            </td>
                                            <td>{chapter.remarks}</td>
                                            <td>
                                                <Link to={"/edit-chapter/" + chapter.id} className='btn btn-sm btn-info text-white'>
                                                    <i className='bi bi-pencil-square'></i>
                                                </Link>
                                                <button onClick={() => handleDeleteClick(chapter.id)} className='btn btn-sm btn-danger ms-1'>
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CourseChapters;
