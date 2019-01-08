import React, { Fragment } from 'react';

const Weapons = ({ data, handleChange }) => {
  return (
    <Fragment>
      <h2>Weapons</h2>
      <div className="form__row">
        <label>Name</label>
        <label>Effect</label>
      </div>
      <div className="form__row">
        <input
          type="number"
          name="act"
          id="act"
          placeholder="act"
          defaultValue={data.adventure.act}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="page"
          id="page"
          placeholder="page"
          defaultValue={data.adventure.page}
          onChange={handleChange}
          required
        />
      </div>
    </Fragment>
  );
};

export default Weapons;
