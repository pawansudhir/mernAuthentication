import React from 'react';
import axios  from "axios";
class LogOut extends React.Component{
  state = {
      user:""
  }
  render(){
    axios.get("http://localhost:5000/logOut").then(resp => {
          console.log(resp.data.user);
          if(resp.data.user){
            this.props.history.push(`/`)
          }
      });
  return (
    <div style = {{textAlign:"center"}}  >
    <strong className = "text-primary"> <p>logging you out ...</p></strong>
    </div>
  );
}
}
export default LogOut;
