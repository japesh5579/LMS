import {Link} from 'react-router-dom'
import logo from './images.jpg';

function Header() {
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
          <div className="container">
            
              <Link className="navbar-brand" to="/">
              <img 
                        src={logo} 
                        alt="KnowledgeNest Logo" 
                        style={{ height: "50px", width: "50px", marginRight: "10px", borderRadius: "50%" }}
                    />
                    <span style={{ fontSize: "1.5rem", color: "#fff" }}>
                        TheKnowledgeNest
                    </span></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className='navbar-nav ms-auto'>
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    <Link className='nav-link' to='/all-courses'>Courses</Link>
                    <li className='nav-item dropdown' >
                        <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button'
                        data-bs-toggle='dropdown' aria-expanded='false'>
                            Teacher
                        </a>
                        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                            {teacherLoginStatus!=='true' && 
                                <>
                                <li><Link className='dropdown-item' to='/teacher-login'>login</Link></li>
                                <li><Link className='dropdown-item' to='/teacher-register'>Register</Link></li>
                                </>
                            }
                            <li><Link className='dropdown-item' to='/teacher-dashboard'>Dashboard</Link></li>
                            <li><Link className='dropdown-item' to='/teacher-logout'>Logout</Link></li>
                        </ul>
                    </li>
                    <li className='nav-item dropdown' >
                        <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button'
                        data-bs-toggle='dropdown' aria-expanded='false'>
                            User
                        </a>
                        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                        {studentLoginStatus!=='true' && 
                        <>
                            <li><Link className='dropdown-item' to='/user-login'>login</Link></li>
                            <li><Link className='dropdown-item' to='/user-register'>Register</Link></li>
                            </>
                        }
                         {studentLoginStatus==='true' && 
                         <>
                            <li><Link className='dropdown-item' to='/user-dashboard'>Dashboard</Link></li>
                            <li><Link className='dropdown-item' to='/user-logout'>Logout</Link></li>
                           
                         
                         </>
                         }
                            </ul>
                    </li>
                </div>
            </div>
        </div>   
    </nav>          
 );
}
  
  export default Header;