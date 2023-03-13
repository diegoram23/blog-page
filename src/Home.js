import { useState, useEffect } from "react"
import Bloglist from "./Bloglist";
import useFetch from "./useFetch";


const Home = () => {

    const { data: blogs, isLoading, errMessage } = useFetch('http://localhost:8000/blogs')
    return (

        <div className="home">
            {isLoading && <div>loading...</div>}
            {errMessage && <div>{errMessage}</div>}
            
            {blogs && <Bloglist
                blogs={blogs}
                title='All blogs' />}

        </div>
    );
}

export default Home;