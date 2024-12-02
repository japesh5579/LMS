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
        <div style={{ marginTop: '20px', padding: '20px' }}>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'style={{
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}>
                        <h5 className='card-header'style={{
                                backgroundColor: 'black',
                                color: 'white',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                            }}>All Chapters({totalResult})<Link className='btn btn-success float-end' to={'/add-chapter/'+course_id}style={{
                                fontSize: '0.9rem',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                marginLeft: '10px',
                            }}>Add Chapter</Link></h5>
                        <div className='card-body'style={{ padding: '20px' }}>
                            <table className='table table-bordered'style={{
                                    width: '100%',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}>
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>Title</th>
                                        <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>Video</th>
                                        <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>Remarks</th>
                                        <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter) =>
                                        <tr key={chapter.id}>
                                            <td><Link to={"/edit-chapter/" + chapter.id} style={{ textDecoration: 'none', color: 'black' }}>{chapter.title}</Link></td>
                                            <td>
                                                <div
                                                    style={{
                                                        marginBottom: '15px',
                                                        overflow: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <video
                                                        controls
                                                        className="mt-2"
                                                        style={{
                                                            width: '100%',
                                                            maxHeight: '300px',
                                                            borderRadius: '10px',
                                                            border: '2px solid #ddd',
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                            objectFit: 'cover',
                                                        }}
                                                    >
                                                        <source src={chapter.video.url} type="video/webm" />
                                                        <source src={chapter.video.url} type="video/mp4" />
                                                        Sorry, your browser doesn't support embedded videos.
                                                    </video>
                                                </div>
                                            </td>

                                            <td>{chapter.remarks}</td>
                                            <td>
                                                <Link to={"/edit-chapter/" + chapter.id} 
                                                className='btn btn-sm btn-info text-white'
                                                style={{ marginRight: '5px' }}>
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
