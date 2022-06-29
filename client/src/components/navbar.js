import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "white", margin: "10% 10% 15% 10%" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link to="/create">CreatePost</Link>
        </li>,
        <li key="4">
          <Link to="/myfollowingpost">My following Posts</Link>
        </li>,
        <li key="5">
          <button
            className="btn waves-effect waves-light #b71c1c red darken-4"
            type="submit"
            name="action"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? "/" : "/signin"} className="brand-logo left ">
          DotConnect
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" class="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            className="label"
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={item._id !== state._id ? "/profile/" + item._id:'/profile'}
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch('')
                  }}
                >
                  <li className="collection-item" style={{ color: "black" }}>
                    {item.email}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-pink btn-flat"
            style={{ color: "red" }}
            onClick={() => setSearch("")}
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
