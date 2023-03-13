import { useState, useEffect } from "react"
import Bloglist from "./Bloglist";

const Home = () => {

    const [blogs, setBlogs] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errMessage, setErrMessage] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    if(!res.ok){
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json()
                })
                .then((data) => {
                    setIsLoading(false)
                    setBlogs(data)
                    setErrMessage(null)
                })
                .catch((err) => {
                    setIsLoading(false)
                    setErrMessage(err.message);
                })
        }, 500);
    }, [])

    return (

        <div className="home">
            {isLoading && <div>loading...</div>}
            {blogs && <Bloglist
                blogs={blogs}
                title='All blogs' />}
                {errMessage && <div>{errMessage}</div>}
        </div>
    );
}

export default Home;