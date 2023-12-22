import React from 'react';

const AddIdiom = () => {
  return (
    <div className="mb-4 mx-4">
      <form action="">
        <div className="row">
          <div className="col-sm">
            <input className="form-control" placeholder="Title" type="text" />
          </div>
          <div className="col-sm">
            <input
              className="form-control"
              placeholder="Title General"
              type="text"
            />
          </div>
          <div className="col-sm-4">
            <input
              className="form-control"
              placeholder="Definition"
              type="text"
            />
          </div>
          <div className="col-sm">
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIdiom;
