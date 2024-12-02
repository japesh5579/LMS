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
                    <div className='card'
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}>
                        <h5 className='card-holder'
                        style={{
                            backgroundColor: '#343a40',
                            color: '#fff',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            padding: '15px'
                        }}>Enrolled Students</h5>
                        <div className='card-body' style={{ padding: '20px' }}>
                            <table className='table table-bordered'
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9',
                                textAlign: 'center',
                                overflow: 'hidden',
                            }}>
                                <thead style={{ backgroundColor: '#f2f2f2', color: 'black' }}>
                                    <tr>
                                        <th style={{ padding: '10px' }}>Name</th>
                                        <th style={{ padding: '10px' }}>Enrolled</th>
                                        <th style={{ padding: '10px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td style={{ padding: '10px' }}><Link to='/'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                        fontWeight: '500',
                                    }}>Japesh </Link></td>
                                    <td style={{ padding: '10px' }}>
                                        <Link to='/'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            fontWeight: '500',
                                        }}>Php</Link></td>
                                    <td style={{ padding: '10px' }}>
                                        <button className='btn btn-danger btn-sm active'
                                        style={{
                                            fontSize: '0.875rem',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                        }}>Delete</button>
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