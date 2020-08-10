import React from 'react';
import axios from 'axios';
import FormAlert from './formAlert';
import { Redirect } from 'react-router-dom';
class Form extends React.Component {
    state = {
        name:'',
        password:'',
        email:'',
        nameError:'',
        passwordError:'',
        emailError:'',
        serverError:false,
        redirect:false,
        exists:""
        
    }
  render(){
    const validate = (name,password,email) => {
      if(name.length<2){
         this.setState({nameError:'name should be atleast of 2 char'});
      }else{this.setState({nameError:''})}
      if(password.length<5){ this.setState({passwordError:'password should be atleast of 2 char'});}
      else{this.setState({passwordError:''})}
      if(email === ""){ this.setState({emailError:'emailField is required'});}
      else{this.setState({emailError:''})}}
    const handleChange = (e) => {
      this.setState({[e.target.name]:e.target.value})
    }
    
    if( this.state.nameError !== '' || this.state.passwordError !== ''  || this.state.emailError !== ''){
        setTimeout(() => {this.setState({nameError:"",passwordError:"",emailError:""})},5000);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var { name,password,nameError,passwordError,email,emailError} = this.state;
       validate(name,password,email);
      if(nameError.length<1 && passwordError.length<1 && emailError.length<1){ 
        axios.post("http://localhost:5000/Register",this.state).then(resp => {
           
          if(resp.data.err === "exists"){  return this.setState({exists:"a user with that email already exists"})}
           if(resp.data.user === "saved"){
            return  this.setState({redirect:true});
           }
           else{
             return this.setState({serverError:true});
            }
       });
      }
      }
  return (
    <div  > 
    {this.state.redirect?<Redirect to = "/404" />:null}
    {this.state.redirect?<Redirect to = "/Home" />:null}
    <div  >
    <form className="form-horizontal  jumbotron container">
    {this.state.emailError !== '' ?<FormAlert  error = {this.state.emailError} />:null}
    {this.state.passwordError !== '' ?<FormAlert  error = {this.state.passwordError} />:null}
    {this.state.nameError !== '' ?<FormAlert  error = {this.state.nameError} />:null}
    {this.state.exists !== '' ?<FormAlert  error = {this.state.exists} />:null}
    <div className="form-group ">
    <label className="control-label col-sm-2" htmlFor="">Name:</label>
    <div className="col-sm-10">
      <input type="name" className="form-control" name = "name" onChange = {handleChange} id="name" placeholder="Enter name" />
    </div>
  </div>
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" name = "email" onChange = {handleChange} id="email" placeholder="Enter email" />
    </div>
  </div>

  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" name = "password" onChange = {handleChange} id="pwd" placeholder="Enter password" />
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <div className="checkbox">
        <label><input type="checkbox" /> Remember me</label>
      </div>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <button type="submit" onClick = {handleSubmit}className="btn btn-default btn-primary btn-block">Submit</button>
    </div>
  </div>
</form>
</div>

    </div>
  )}
  }
export default Form;
