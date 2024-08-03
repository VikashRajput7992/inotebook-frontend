import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'https://backend-2h1i.onrender.com';
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //get all notes
    const getAllNotes = async () => {
        //api calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        //api calls
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json(); 

        //logic to add note in client
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {
        //api calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json(); 
        console.log(json);
        
        //logic to delete note in client
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }

    const editNote = async (id, title, description, tag) => {
        //api calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), 
        });
        const json = await response.json(); 
        console.log(json);

        //logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    
    const [mode, setMode] = useState("light");
    const handleToggle = ()=>{
        if (mode==='light') {
            localStorage.setItem('dark','true');
            setMode('dark');
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
        }
        else{
            localStorage.setItem('dark','false');
            setMode('light');
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes,mode,handleToggle }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;