import React from "react";

const Search = ({ onChange, value }) => {
  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="m-2 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={onChange}
            value={value}
            type="text"
            id="default-search"
            className="block mt-10 md:w-[450px] p-4 pl-12 text-sm text-gray-900 rounded-lg bg-white outline-none"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
