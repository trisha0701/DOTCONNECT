import React,{useState,useContext} from "react"
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from 'materialize-css'
const SignIn = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")

  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html:"invalid email", classes:"#f44336 red"})
    return
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error, classes:"#f44336 red"})
      }else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER", payload:data.user})
        M.toast({html:"Logged in successfully", classes:"#43a047 green darken-1"})
        history.push('/')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="mycard ">
      <div className="card auth-card input-field #e57373 red lighten-2">
        <h2>DotConnect</h2>
        <input className="label" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input  className="label" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn waves-effect waves-light #ffcdd2 red lighten-4" type="submit" name="action"
        onClick={()=>PostData()}
        >
          Login
        </button>
        <h5>
            <Link className="card-bottom-text" to="/signup">Don't have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default SignIn;
