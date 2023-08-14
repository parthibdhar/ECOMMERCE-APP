import React from "react";
import { useSearch } from "../../context/searchProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const port = process.env.REACT_APP_API;
    const navigate = useNavigate()
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const {data} = await axios.get(`${port}/api/v1/products/searchProduct/${values.keyWords}`)
        console.log(data);
        setValues({...values, results: data});
        
        navigate('/search')
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyWords}
          onChange={(e) => setValues({ ...values, keyWords: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
