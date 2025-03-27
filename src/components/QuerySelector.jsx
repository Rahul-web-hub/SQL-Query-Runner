import React from 'react';


// this is the code for the query selector which will help the user to select the query from the dropdown
const QuerySelector = ({ queries, selectedQuery, onQueryChange }) => (
  <select
    value={selectedQuery.id}
    onChange={(e) => {
      const query = queries.find(q => q.id === e.target.value);
      onQueryChange(query);
    }}
    className="query-selector"
  >
    {queries.map(query => (
      <option key={query.id} value={query.id}>
        {query.name}
      </option>
    ))}
  </select>
);

export default QuerySelector;