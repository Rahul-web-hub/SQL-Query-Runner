import React from 'react';



// This component will display the metrices of the query
// It will help the user to understand the performance of the  query performed

const QueryMetrics = ({ execTime, rowCount, complexity }) => (
  <div className="metrics-container">
    <div className="metric-item">
      <span className="metric-label">Execution Time:</span> 
      <span className="metric-value">{execTime}ms</span>
    </div>
    <div className="metric-item">
      <span className="metric-label">Rows Returned:</span>
      <span className="metric-value">{rowCount}</span>
    </div>
    <div className="metric-item">
      <span className="metric-label">Complexity:</span>
      <span className="metric-value">{complexity}/5</span>
    </div>
  </div>
);

/*Mock complexity calculator
this is just a mock function to calculate the complexity of the query using the keywords present in the query*/

export const calculateComplexity = (query) => {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY'];
  return Math.min(keywords.filter(kw => query.includes(kw)).length, 5);
};

/* the logic of this code is simple , it justs count how many keywords are there and then return the minimum of the count and 5
this is done to make sure that the complexity does not exceed 5*/

export default QueryMetrics;