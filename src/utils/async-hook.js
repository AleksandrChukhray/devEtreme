import { useEffect, useState } from 'react';

export const useFetch = ({ url }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    async function fetchData(){
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();

        setLoading(false);
        setData(json);
    }

    useEffect(() => {
        fetchData()
    }, [url])

    return [data, loading];
}

export default useFetch;