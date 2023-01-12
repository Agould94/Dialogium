//react, react routers
import { useState, useEffect } from "react";
import {Switch, Route} from "react-router-dom"

//redux
import { useDispatch } from "react-redux";
import {login} from "./features/User/userSlice"
import {logout} from "./features/User/userSlice"


//features

//home
import Home from "./components/Home";

//user
import Login from "./features/User/Login";
import SignUp from "./features/User/Signup";
import UserProfile from "./features/User/UserProfile";

//course
import CoursePage from "./features/Courses/CoursePage";



function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch()

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
      }else{
        dispatch(login(data))
      }})
  }, []);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path = "/">
          <Home></Home>
        </Route>
        <Route path = "/profile">
          <UserProfile handleLogout = {handleLogout}></UserProfile>
        </Route>
        <Route path = "/courses/:id">
          <CoursePage></CoursePage>
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

export default App;