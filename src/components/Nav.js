import React,{useEffect,useState} from 'react';
import Form from "./form";
import Home from './Home';
import LogOut from "./LogOut";
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import LoginForm from './loginForm';
import Body from './body';
import NotFound from "./NotFound.js";
import Axios from 'axios';
function Nav({loggedIn,logOut,logIn}) {
  const [user,changeUser] = useState({user:""});
  useEffect(() => {
    Axios.get("http://localhost:5000/nav",{withCredentials: true}).then((resp) => {
      console.log(resp.data);
      if(resp.data.user === "defined"){
      changeUser({user:"allowed"});
      }else{
        changeUser({user:""});
      }
    })
  },[])
  return (
    <div >
      <BrowserRouter>
        <nav className = "navbar  bg-info mb-5">
        <Link className = "p-3 mb-2 mt-2 text-white"  to = "/Home"> Home </Link>
        <Link className = "p-3 mb-2 mt-2 text-white"  to = "/Register"> Register </Link>
        {user.user.length > 0?<Link className = "p-3 mb-2 mt-2 text-white"  to = "/LogOut"> LogOut </Link>:<Link className = "p-3 mb-2 mt-2 text-white"  to = "/Login"> Login </Link>}
          </nav>
        <div className = "container-fluid mt-10">
        <Switch>
          <Route exact path = "/Home" component = {Home }/>
          <Route  exact path = "/Register" component = {Form } />
          <Route exact path = "/" component = {Body}/>
          {user.user.length > 0?<Route exact path = "/LogOut" component = {LogOut}/>:<Route exact path = "/Login" component = {LoginForm }/>}
          <Route exact path = "*" component = {NotFound}/>
          </Switch>
          </div>
        </BrowserRouter>
        
        
    </div>
  );
}

export default Nav;

