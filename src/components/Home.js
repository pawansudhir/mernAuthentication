import React from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';

class Home extends React.Component{
    
    state = {
       info  : [],
      
    }
    componentDidMount(){
      axios.get("http://localhost:5000/home",{withCredentials: true}).then(resp => {
           console.log(resp.data);
         });
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
            this.setState({
              info:res.data.slice(0,10)
            });
         });
         
    }    
     render(){
     
        const {info} = this.state; 
        var infolist = info.map((particle) => {
             return(
                 <div key ={particle.id}>
                 <Link to = {'/' + particle.id}>
                 <h1> {particle.title}</h1>
                 </Link>
                 <p> {particle.body}</p>
                 <hr />
                 </div>
             )
        });
        const handleChange = (e) => {
            var {value} = e.target
            const regex = new RegExp(`${value}`,"i");

           const suggestions = this.state.info.filter(v => {
            return regex.test(v.title);
    });
    this.setState({info:suggestions});
  }
        return(
          <div>
          <div className = "container-fluid bg-light">
             <div  className = "container-fluid jumbotron center mt-2 ">
             <form className ="form-inline my-2 my-lg-0">
            <input className ="form-control mr-sm-2" type="search" onChange = {handleChange}  placeholder="Search" aria-label="Search" />
            <button className ="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
             </form>
             </div>
           {infolist}
           </div>:
           
           </div>
        )
    }
}
export default Home;