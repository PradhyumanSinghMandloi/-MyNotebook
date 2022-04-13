
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const notesintial = [
        {
          "_id": "6253bc9a4bd5b4b54c37cc5f",
          "user": "6251440ea569ae69b026ed2b",
          "title": "my title updated",
          "description": "Please wake up early updated",
          "tag": "personal",
          "date": "2022-04-11T05:28:58.166Z",
          "__v": 0
        },
        {
          "_id": "6253cc19f220f67c0567194a",
          "user": "6251440ea569ae69b026ed2b",
          "title": "Title 2",
          "description": "Need to loose wait",
          "tag": "personal",
          "date": "2022-04-11T06:35:05.145Z",
          "__v": 0
        },
        {
          "_id": "6253cc36f220f67c0567194c",
          "user": "6251440ea569ae69b026ed2b",
          "title": "Title 3",
          "description": "Ned to go for 5 kn running",
          "tag": "personal",
          "date": "2022-04-11T06:35:34.292Z",
          "__v": 0
        }

      ]

      const [notes, setnotes] = useState(notesintial)

    return ( 

        <NoteContext.Provider  value ={{notes , notesintial}}>

            {props.children}
        </NoteContext.Provider>
    )    

}


export default NoteState; 