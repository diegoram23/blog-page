import { useState } from "react";
import {useHistory} from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('yoshi')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleTitle = (e) => {
        console.log(e.target.value);
        setTitle(e.target.value)
    }

    const handleBody = (e) => {
        console.log(e.target.value);
        setBody(e.target.value)
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value)
        console.log(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, body, author }
        setIsPending(true)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            setTimeout(() => {
                setIsPending(false)
                history.push('/')
            }, 1000);
        })
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            {isPending && <div>Posting....</div>}
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input
                    type='text'
                    required
                    value={title}
                    onChange={handleTitle}
                />
                <label>Blog body</label>
                <textarea
                    required
                    value={body}
                    onChange={handleBody}
                >
                </textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={handleAuthor}
                >
                    <option value='mario'>mario</option>
                    <option value='yoshi'>yoshi</option>
                </select>
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Posting</button>}
            </form>
        </div>
    );
}

export default Create;