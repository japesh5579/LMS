import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='card' style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '15px',
            height: '100%'
        }}>
            <div className='list-group list-group-flush'>
                <Link to="/user-dashboard" 
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
                <Link to="/my-courses" 
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
                <Link to="/favorite-courses" 
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
                    }}>Favorite Courses</Link>
                <Link to="/recommended-courses" 
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
                    }}>Recommended Courses</Link>
                <Link to="/profile-setting" 
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
                <Link to="/change-password" 
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
                <Link to="/user-login" 
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
                    }}>Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;
