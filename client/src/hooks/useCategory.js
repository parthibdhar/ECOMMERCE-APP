import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useCategory(){
    const port = process.env.REACT_APP_API
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
try {
    const {data} = await axios.get(`${port}/api/v1/category/getAll-Categories`)
    if (data?.success) setCategories(data?.allCategories);
} catch (error) {
    console.log(error);
}
    }

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line
    }, []);
    return categories;
}

