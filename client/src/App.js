//react, react routers
import { useState, useEffect } from "react";
import {Switch, Route} from "react-router-dom"

//redux
import { useDispatch, useSelector } from "react-redux";
import {login} from "./features/User/userSlice"
import {logout} from "./features/User/userSlice"


//features

//navbar
import NavBar from "./features/NavBar/NavBar";

//home
import Home from "./components/Home";

//user
import Login from "./features/User/Login";
import SignUp from "./features/User/Signup";
import UserProfile from "./features/User/UserProfile";
import UpdateProfile from "./features/User/UpdateProfile";

//course
import CoursePage from "./features/Courses/CoursePage";
import CreateCourse from "./features/Courses/CreateCourse";

//lesson
import LessonPage from "./features/Lessons/LessonPage";
import CreateLesson from "./features/Lessons/CreateLesson";



function App() {
  const [count, setCount] = useState(0);
  const [loadingUser, setLoadingUser]= useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  console.log(user)

  function handleLogout(e){
    e.preventDefault()
    fetch('logout', {method: "DELETE"})
    .then((r)=> dispatch(logout()))}

  useEffect(() => {
    // auto-login
      fetch("/me")
      .then((r) => r.json())
      .then((data) => {
        if(data.error){
          console.log(data)
          setLoadingUser(false)
        }else{
          dispatch(login(data))
          setLoadingUser(false)
        }})
  }, []);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);
  if(!loadingUser){
  return (
    <div className="App">
      <NavBar></NavBar>
      <Switch>
        <Route exact path = "/">
          <Home></Home>
        </Route>
        <Route path = "/profile">
          <UserProfile handleLogout = {handleLogout}></UserProfile>
        </Route>
        <Route path = "/updateUser">
          <UpdateProfile></UpdateProfile>
        </Route>
        <Route exact path = "/courses/create">
          <CreateCourse></CreateCourse>
        </Route>
        <Route exact path = "/courses/:id">
          <CoursePage></CoursePage>
        </Route>
        <Route path = "/users/:id">
          <UserProfile></UserProfile>
        </Route>
        <Route exact path = "/courses/:courseId/sections/:sectionNum/lessons/:lessonNum">
          <LessonPage></LessonPage>
        </Route>
        <Route exact path = "/courses/:courseId/sections/:sectionNum/new">
          <CreateLesson></CreateLesson>
        </Route>
        <Route path = "/login">
          <Login></Login>
        </Route>
        <Route path = "/signup">
          <SignUp></SignUp>
        </Route>
      </Switch>
    </div>
  );
  }
}

export default App;