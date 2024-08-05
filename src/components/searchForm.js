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
        <div className='mb-5'> 
            <form onSubmit={handleSubmit}>  
                {/* <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/> */}
                <input className='rounded-lg p-1 text-black text-lg font-mono h-8 mr-3 border-lime-400 border-2'
                     type='text' ref={searchRef} placeholder='Search Artists'/>
                <button className='text-lime-400 font-mono text-2xl' type='submit'> Search </button>
            </form>
        </div>
    )
}
export default SearchForm;
