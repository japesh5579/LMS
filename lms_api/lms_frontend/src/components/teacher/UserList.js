import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useEffect } from 'react';

function UserList(){
    useEffect(()=>{
        document.title='Enrolled Students';
    });
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-holder'>Enrolled Students</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td><Link to='/'>Japesh </Link></td>
                                    <td><Link to='/'>Php</Link></td>
                                    <td>
                                        <button className='btn btn-danger btn-sm active'>Delete</button>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default UserList;