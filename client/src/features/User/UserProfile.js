import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function UserProfile({handleLogout}){
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch() 
    console.log(user)


    return(
        <div>
        <h1>{user.first_name}</h1>
        <button onClick = {handleLogout}>Logout</button>
        </div>

    )
}  

export default UserProfile