import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("success","Note added successfully");
    }
    return (
        <div className="container my-3">
            <h1>Add A Note</h1>
            <form className='my-3' onSubmit={handleOnClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange} aria-describedby="emailHelp" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Add Note</button>
            </form>
        </div>
    )
}

export default Addnote