import React from 'react'
import "./searchBar.scss"

function SearchBar() {
  return (
    <div className='searchBar'>
      <div className="type"></div>
      <form>
        <input type="text" name='location' placeholder='City Location' />
        <input type="text" name='studyfield' placeholder='Study Field' />
        <input type="text" name='college' placeholder='College' />
        <button>
            <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
