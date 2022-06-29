import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () =>{
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     const renderList = () =>{
       if(state){
          return [
            <li><Link to="/profile">Profile</Link></li>,
            <li><Link to="/create">CreatePost</Link></li>,
            <li><Link to="/myfollowingpost">My following Posts</Link></li>,
            <li>
              <button className="btn waves-effect waves-light #b71c1c red darken-4" type="submit" name="action"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
        }}
        >
          Logout
        </button>
            </li>,
          ]
       }else{
         return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
         ]
       }
     }

    return(  
      <nav>
      <div className="nav-wrapper">
      <Link to={state?"/":"/signin"} className="brand-logo left ">DotConnect</Link>
      <ul id="nav-mobile" className="right">
      {renderList()}
      </ul>
      </div>
      </nav>
    );
}

export default NavBar;