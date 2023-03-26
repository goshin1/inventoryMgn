import { useEffect, useState } from 'react';

export default function useFetch(url){
    const [data, setData] = useState([]);
    useEffect( () => {
            fetch(url, {
                headers: {
                    Accept: "application / json",
                },
            }).then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
            });
    }, [url]);

    return data;
}