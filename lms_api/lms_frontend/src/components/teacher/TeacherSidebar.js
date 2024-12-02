import { Link } from 'react-router-dom';

function TeacherSidebar(){
    return(
        <div className='card'>
                <div className='list-group list-group-flush'>
                    <Link to="/teacher-dashboard" className='list-group-item list-group-item-action'>Dashboard</Link>
                    <Link to="/teacher-courses" className='list-group-item list-group-item-action'>My Courses</Link>
                    <Link to="/add-courses" className='list-group-item list-group-item-action'>Add Courses</Link>
                    <Link to="/teacher-users" className='list-group-item list-group-item-action'>My User</Link>
                    <Link to="/teacher-profile-setting" className='list-group-item list-group-item-action'>Profile</Link>
                    <Link to="/teacher-change-password" className='list-group-item list-group-item-action'>Change Password</Link>
                    <Link to="/teacher-logout" className='list-group-item list-group-item-action text-danger'>logout</Link>
                </div>
        </div>
    );
}

export default TeacherSidebar;