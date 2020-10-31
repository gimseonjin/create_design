/* useReqeust.js */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const usePost = (url, input) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    console.log('2');
    useEffect(
        async () => {
            console.log('2-0');
            setError(false);

            try {
                setLoading(true);
                console.log('2-1');
                const res = await axios.post(url, input);
                console.log('2-2');
                setResponse(res);
                console.log('2-3');
            } catch (e) {
                setError(e);
            }

            setLoading(false);
            console.log('2-4');
        },
        [url]
    );
    console.log('2-5');
    return [response, loading, error];
}

export default usePost;