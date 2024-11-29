import Header from './Header';
import Home from './Home';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';

//User
import Login from './user/Login';
import Logout from './user/StudentLogout';
import Register from './user/Register';
import About from './About';
import Footer from './Footer';
import Dashboard from './user/Dashboard';
import MyCourses from './user/MyCourses';
import FavoriteCourses from './user/FavoriteCourses';
import RecommendedCourses from './user/RecommendedCourses';
import ProfileSetting from './user/ProfileSetting';
import ChangePassword from './user/ChangePassword';


import { Routes as Switch,Route } from 'react-router-dom';
//Teacher
import TeacherLogin from './teacher/TeacherLogin';
import TeacherLogout from './teacher/TeacherLogout';
import TeacherRegister from './teacher/TeacherRegister';
import TeacherDashboard from './teacher/TeacherDashboard';
import TeacherCourses from './teacher/TeacherCourses'; 
import AddCourses from './teacher/AddCourses';
import EditCourse from './teacher/EditCourse';
import AddChapter from './teacher/AddChapter';
import AllChapters from './teacher/CourseChapters';
import EditChapter from './teacher/EditChapter';
import TeacherChangePassword from './teacher/TeacherChangePassword';
import TeacherProfileSetting from './teacher/TeacherProfileSetting'; 
import UserList from './teacher/UserList'; 

//List Pages
import AllCourses from './AllCourses'
import PopularCourses from './PopularCourses'
import PopularTeacher from './PopularTeacher'
import CategoryCourses from './CategoryCourses'
import TeacherSkillCourses from './TeacherSkillCourses'


function Main() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/detail/:course_id" element={<CourseDetail/>}/>
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail/>}/>
        <Route path="/all-courses" element={<AllCourses/>}/>
        <Route path="/all-chapters/:course_id" element={<AllChapters/>}/>
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter/>}/>
        <Route path="/popular-courses" element={<PopularCourses/>}/>
        <Route path="/popular-teacher" element={<PopularTeacher/>}/>
        <Route path="/category/:category_slug" element={<CategoryCourses/>}/>
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses/>}/>


        <Route path="/user-login" element={<Login/>}/>
        <Route path="/user-logout" element={<Logout/>}/>
        <Route path="/user-register" element={<Register/>}/>
        <Route path="/user-dashboard" element={<Dashboard/>}/>
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/favorite-courses" element={<FavoriteCourses/>}/>
        <Route path="/recommended-courses" element={<RecommendedCourses/>}/>
        <Route path="/profile-setting" element={<ProfileSetting/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>


        <Route path="/teacher-login" element={<TeacherLogin/>}/>
        <Route path="/teacher-logout" element={<TeacherLogout/>}/>
        <Route path="/teacher-register" element={<TeacherRegister/>}/>
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
        <Route path="/teacher-courses" element={<TeacherCourses/>}/>
        <Route path="/add-courses" element={<AddCourses/>}/>
        <Route path="/edit-course/:course_id" element={<EditCourse/>}/>
        <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
        <Route path="/teacher-change-password" element={<TeacherChangePassword/>}/>
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting/>}/>
        <Route path="/teacher-users" element={<UserList/>}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default Main;
