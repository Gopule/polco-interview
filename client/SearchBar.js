import React from "react";

const SearchBar = ({ setSearchName, setSearchTag }) => {
  return (
    <div className="searchInputBox">
      <input
        type="text"
        name="searchName"
        autoComplete="off"
        placeholder="Search by name"
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
        className="search-bar"
      />
      <input
        type="text"
        name="searchTag"
        autoComplete="off"
        placeholder="Search by tag"
        onChange={(event) => {
          setSearchTag(event.target.value);
        }}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
