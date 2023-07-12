import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  console.log("value: " + value);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        <input type="submit" class=" m-3 btn btn-primary" value='submit'/>
        </div>
        
      </form>
    </>
  );
};

export default CategoryForm;
