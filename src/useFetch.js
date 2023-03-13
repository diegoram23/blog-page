import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) { // error coming back from server
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setIsLoading(false);
                    setData(data);
                    setErrMessage(null);
                })
                .catch(err => {
                    // auto catches network / connection error
                    setIsLoading(false);
                    setErrMessage(err.message);
                })
        }, 300);
    }, [url])
    return { data, isLoading, errMessage }
}

export default useFetch;