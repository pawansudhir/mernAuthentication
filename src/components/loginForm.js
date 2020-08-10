import React from 'react';
import FormAlert from "./formAlert";
import axios from 'axios'
class LoginForm extends React.Component{
  state = {
    email:'',
    password:'',
    passwordError:"",
    emailError:"",
    user:false,
    error:""
  }
   handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  validate = (password,email) => {
    if(password.length<1){ this.setState({passwordError:'password field is required'});}
    else{this.setState({passwordError:''})}
    if(email === ""){ this.setState({emailError:'emailField is required'});}
    else{this.setState({emailError:''})}}
   handleSubmit = (e) => {
    var {password,email} = this.state;
    this.validate(password,email);
    if(password !== "" && email !== ""){
      console.log("going in")
      axios.post('http://localhost:5000/login',{email:email,password:password}).then(resp => {
        console.log(resp.data);
        if(resp.data.user){
          return this.props.history.push("/Home")
           
        }else{
         this.setState({user:resp.data.user,error:"oops! you have entered incorrect username or password"});
        }
      }).catch(err => {console.log(err)});
    }
  }
 render(){
     if( this.state.passwordError !== ''  || this.state.emailError !== ''){
      setTimeout(() => {this.setState({passwordError:"",emailError:""})},5000);
  }
  return (
    <div >
   
    {this.state.error.length>1?< FormAlert error = {this.state.error}/>:null}
    <div className = " jumbotron container ml-12">
    {this.state.emailError !== '' ?<FormAlert  error = {this.state.emailError} />:null}
    {this.state.passwordError !== '' ?<FormAlert  error = {this.state.passwordError} />:null}
  <div className="form-horizontal">
    <div className="col">
      <input type="text" className="form-control mb-3" onChange = {this.handleChange} id="email" placeholder="Enter email" name="email" />
    </div>
    <div className="col">
      <input type="password" className="form-control mb-3" onChange = {this.handleChange} placeholder="Enter password" name="password" />
    </div>
    <div className="col">
      <input type="submit" onClick = {this.handleSubmit} className="form-control btn-primary btn-block sm-4 mb-4" />
    </div>
  </div>
     Don't have an account?<a href = "/Register">Register</a>
    </div>
    </div>
  );
}
}
export default LoginForm;
