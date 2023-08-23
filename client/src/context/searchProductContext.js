import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";


const SearchContext = createContext();

const SearchProvider = ({children}) =>
{
    const [search, setSearch] = useState({
        keyWords: "",
        results: []
    })


    return(
        <SearchContext.Provider value={[search, setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}

//custom hook

const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider}