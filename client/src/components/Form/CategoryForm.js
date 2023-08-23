import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  console.log("value: " + value);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        <input type="submit" className=" m-3 btn btn-primary" value='submit'/>
        </div>
        
      </form>
    </>
  );
};

export default CategoryForm;
