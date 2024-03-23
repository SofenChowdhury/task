import React, { useState } from 'react';
import Fuse from 'fuse.js';

const SearchComponent = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fuse = new Fuse(products, {
    keys: ['name'],
    threshold: 0.4, // Adjust according to your preference
  });

  const debouncedSearch = (query) => {
    // Debounce logic to delay search execution
    setTimeout(() => {
      const results = fuse.search(query);
      setSearchResults(results);
    }, 300); // Adjust delay time as needed
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

//   console.log('fsuxyyyyyyyyyyyy');
//   console.log(products);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;