import { Link } from 'react-router-dom';

function TeacherSidebar(){
    return(
        <div className='card' style={{
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '15px',
            height: '100%'
        }}>
                <div className='list-group list-group-flush'>
                    <Link to="/teacher-dashboard" 
                        className='list-group-item list-group-item-action'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>Dashboard</Link>
                    <Link to="/teacher-courses" 
                        className='list-group-item list-group-item-action'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>My Courses</Link>
                    <Link to="/add-courses" 
                        className='list-group-item list-group-item-action' 
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>Add Courses</Link>
                    <Link to="/teacher-users" 
                        className='list-group-item list-group-item-action'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}
                        >My User</Link>
                    <Link to="/teacher-profile-setting" 
                        className='list-group-item list-group-item-action'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>Profile</Link>
                    <Link to="/teacher-change-password" 
                        className='list-group-item list-group-item-action'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>Change Password</Link>
                    <Link to="/teacher-logout" 
                        className='list-group-item list-group-item-action text-danger'
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            color: '#dc3545',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}>logout</Link>
                </div>
        </div>
    );
}

export default TeacherSidebar;