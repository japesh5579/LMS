import {Link} from 'react-router-dom'
import { useEffect } from 'react';

function PopularCourses(){
    useEffect(()=>{
        document.title='Popular Courses';
    });
    return(
        <div className='container mt-3'>
        {/* Latest Courses */}
        <h3 className=" pb-1 mb-4">Popular Courses </h3>
        <div className="row">
            <div className="col-md-3 mb-4">
        <div className="card" >
         <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-3 mb-4">
        <div className="card" >
         <a href="#"><img src="logo512.png" className="card-img-top" alt="..."/></a>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-3 mb-4">
        <div className="card" >
         <a href="#"><img src="logo512.png" className="card-img-top" alt="..."/></a>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-3 mb-4">
        <div className="card" >
         <a href="#"><img src="logo512.png" className="card-img-top" alt="..."/></a>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-3 mb-4">
        <div className="card" >
         <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div> <div className="col-md-3 mb-4">
        <div className="card" >
         <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div> <div className="col-md-3 mb-4">
        <div className="card" >
         <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div> <div className="col-md-3 mb-4">
        <div className="card" >
         <Link to="/detail/1"><img src="logo512.png" className="card-img-top" alt="..."/></Link>
             <div className="card-body">
            <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
            </div>
            <div className='card-footer'>
                <div className='title'>
                    <span>Rating: 4/5</span>
                    <span className='float-end'>Views: 4.5k</span>
                </div>
            </div>
        </div>
        </div>
        </div>
        {/* End Latest Courses */}
        {/* Pagination start */}
        <nav aria-label="Page navigation example mt-5">
        <ul class="pagination justify-content-center">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
        </nav>
        {/* Pagination end */}
        </div>
    );
}

export default PopularCourses;