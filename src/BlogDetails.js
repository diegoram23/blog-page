import { useParams } from 'react-router-dom'
import useFetch from './useFetch';
import {useHistory} from 'react-router-dom'

const BlogDetails = () => {
    const { id } = useParams()
    const { data:blog, isLoading, errMessage } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory()

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        }).then (() => {
            history.push('/')
        })
    }

    return ( 
        <div className='blog-details'>
            {isLoading && <div>...Loading</div>}
            {errMessage && {errMessage}}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;