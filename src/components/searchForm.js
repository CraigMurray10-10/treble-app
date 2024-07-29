import { Component, useEffect, useState, useRef } from 'react';
import '../resources/App.css';

const SearchForm = ({searchMethod}) => {
    // const [searchKey, setSearchKey] = useState("")
    const searchRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMethod(searchRef.current.value);
    }

    return (
        <div> 
            <form onSubmit={handleSubmit}>  
                {/* <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/> */}
                <input type='text' ref={searchRef} placeholder='Search Artists'/>
                <button type='submit'> Search </button>
            </form>
        </div>
    )
}
export default SearchForm;
