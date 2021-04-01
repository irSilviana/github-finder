import React, { useState } from "react";

export default function Search() {
  let [text, setText] = useState("");

  function onChange(event) {
    setText(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(text);
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    </div>
  );
}
