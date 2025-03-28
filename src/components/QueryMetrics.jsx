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



export default QueryMetrics;