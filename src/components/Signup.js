import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'
const Signup = (props) => {

  const [credentials, setCrdentials] = useState({name : "" ,email : "" , password : "", cpassword : ""})
  let history = useHistory();

  const handleSubmit =async (e)=>{
    e.preventDefault();

    const {name , email , password } =credentials;
    const response = await  fetch("http://localhost:5000/api/auth/createuser" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        
        },  body: JSON.stringify({ name , email , password}),
      })

      const json = await response.json();
      if(json.success)
      { 

            //save the auth tolen and redirect
            localStorage.setItem('token' , json.authtoken)
            history.push("/");
            props.showAlert("Account created successfully" , "success")
      }
      else{
          props.showAlert("Invalid credentials" , "danger")
      }
    }
  const onChange = (e)=> {

    setCrdentials({...credentials , [e.target.name] : e.target.value})

}


  return (
    <div className="container mt-2">

<h2>Create your accout</h2>
<form  onSubmit={handleSubmit} >
  <div className="form-group">
    <label htmlFor="name">Name </label>
    <input type="text" className="form-control" id="name"  name="name" onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>

  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email"  name ="email"onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  name="password"onChange={onChange} placeholder="Password" minLength={5} required/>
  </div>

  <div className="form-group">
    <label htmlFor="cpassword"> Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Password"/>
  </div>

  <button type="submit" className="btn btn-primary mt-2">Submit</button>
</form>


    </div>
  )
}

export default Signup