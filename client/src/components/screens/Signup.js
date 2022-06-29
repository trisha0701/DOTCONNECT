import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = ()=>{
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dotconnect");
    data.append("cloud_name", "dotconnect");
    fetch("https://api.cloudinary.com/v1_1/dotconnect/image/upload", {
      method: "post",
      body: data,
    }).then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const uploadFields = ()=>{
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#f44336 red" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic:url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#f44336 red" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const PostData = () => {

    if(image){
      uploadPic()
    }else{
       uploadFields()
    }
    
  };
  return (
    <div className="mycard ">
      <div className="card auth-card input-field #e57373 red lighten-2">
        <h2>DotConnect</h2>
        <input
          className="label"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="label"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="label"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #ffcdd2 red darken-2">
            <span>Upload Profile</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #ffcdd2 red lighten-4"
          type="submit"
          name="action"
          onClick={() => PostData()}
        >
          SignUp
        </button>
        <h5>
          <Link className="card-bottom-text" to="/signin">
            Already have an account ?
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
