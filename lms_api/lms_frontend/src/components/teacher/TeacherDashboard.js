import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect } from 'react';

function TeacherDashboard(){
    useEffect(()=>{
        document.title='Teacher Dashboard';
    });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card border-primary text-center'>
                                <div className='card-header bg-primary text-white'>Total Courses</div>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        <Link to="/teacher-courses" className='text-decoration-none'>3</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card border-success text-center'>
                                <div className='card-header bg-success text-white'>Total Students</div>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        <Link to="/teacher-users" className='text-decoration-none'>12</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card border-info text-center'>
                                <div className='card-header bg-info text-white'>Total Chapters</div>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        <Link to="/teacher-courses" className='text-decoration-none'>6</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;