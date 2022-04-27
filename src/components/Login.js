import React , {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCrdentials] = useState({email : "" , password : ""})
    let history = useHistory();
  const {showAlert} = props;

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await  fetch("http://localhost:5000/api/auth/login" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        
        },  body: JSON.stringify({email : credentials.email , password :credentials.password}),
      })

      const json = await response.json();
      if(json.success)
      { 

            //save the auth tolen and redirect
            localStorage.setItem("token" , json.authtoken)
            showAlert("Logged in successfully" , "success")
            history.push("/");
      }
      else{
        showAlert("Invalid details" , "danger")
      }
    }

    const onChange = (e)=> {

        setCrdentials({...credentials , [e.target.name] : e.target.value})
    
    }
  return (
    <div className='mt-3'>

    <h2> Login to access your notes</h2>
    <form  onSubmit={handleSubmit}>
    <div className="form-group my-2">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" name="email" id="email"  value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
    </div>
    <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control"  name="password"  value={credentials.password}   onChange={onChange} placeholder="Password"/>
    </div>

    <button type="submit" className="btn btn-primary my-2" >Submit</button>
    </form>



    </div>
  )
}

export default Login