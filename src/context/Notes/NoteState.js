
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const  s1 ={
        "name" : "harry",
        "class" : "10"
    }

   const [state , setState] = useState(s1);
     const update = () =>{
        setTimeout(()=>{
            setState({
                "name" : "John",
                "class" : "12"
            })
        }, 1000);
    }

    return ( 

        <NoteContext.Provider  value ={{state :state,update : update}}>

            {props.children}
        </NoteContext.Provider>
    )    

}


export default NoteState; 