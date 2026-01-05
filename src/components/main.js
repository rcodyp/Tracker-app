import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/dashboard.css'

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [texted, setText] = useState('');
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);


    const navigate = useNavigate()

    async function flush() {
        await localStorage.clear()
        setUser(null)
        navigate('/login')
    }

    const send = async (note) => {
        setIsEditing(true)
        setText(note.text)
        setEditingId(note._id)
        //console.log(noteId)
    }

    const edit = async (text, noteId) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://tracker-app-backend-wnp7.onrender.com/notes/${noteId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ text: text })
        })
        if (res.ok) {
            console.log('ok')
            const updatedNotes = await res.json()
            console.log('successfully edited', updatedNotes)
            console.log(noteId)
            notes.map(note => {
                console.log(`this is the preveious one: ${note._id, note.text}`);
            });
            console.log(updatedNotes._id)
            setNotes(prevNotes => prevNotes.map(note => note._id === updatedNotes._id ? { ...note, text: updatedNotes.text } : note))
        }
        setIsEditing(false)
        setText('')
    }

    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("https://tracker-app-backend-wnp7.onrender.com/notes", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setNotes(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchNotes();
    }, []);


    const handelSubmit = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("https://tracker-app-backend-wnp7.onrender.com/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ text: texted })
        });
        if (!res.ok) {
            const data = await res.json()
            alert(data); 
            return;
        }

        if (res.ok) {
            const data = await res.json()
            setNotes(prev => [...prev, data]);
            setText('');
        }
    }

    const del = async (noteId) => {
        const token = localStorage.getItem("token");
        await fetch(`https://tracker-app-backend-wnp7.onrender.com/notes/${noteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data.message);
                setNotes(preNotes => preNotes.filter(note => note._id !== noteId))

            }).catch(err => console.error(err))
    }

    useEffect(() => {
        //const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (token) {
            fetch("https://tracker-app-backend-wnp7.onrender.com/user", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch user");
                    return res.json();
                })
                .then(data => {
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data)); // store for next time
                })
                .catch(err => console.error(err));
        }
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <header className="navbar">
                <h2>Tracker -ToDo</h2>
                <button className="logout" onClick={flush}>Logout</button>
            </header>
            <form onSubmit={(e) => e.preventDefault()}>
                <main className="content">
                    <h1>Welcome, {user.name}</h1>
                    {/* <p className="subtitle">{user.email}</p> */}
                    <div className="note-input">
                        <input
                            type="text"
                            placeholder="Write a note..."
                            value={texted}
                            onChange={e => setText(e.target.value)}
                        />
                        {isEditing ? <button onClick={() => edit(texted, editingId)}>Save</button> : <button onClick={handelSubmit}> Add</button>}
                    </div>
                    <div className="notes">
                        {notes.map(note => (
                            <div key={note._id} className="note-card">
                                <p>{note.text}</p>
                                <button className="edit-btn" onClick={() => send(note)}>Edit</button>
                                <button className="delete-btn" onClick={() => del(note._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </main>
            </form>
        </div>
    );
}
