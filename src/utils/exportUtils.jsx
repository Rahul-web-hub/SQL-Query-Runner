
// To import the file in the form of csv or json format ,I have provided the options to do so
export const exportToCSV = (columns, rows) => {
    const csvContent = [
      columns.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    return url;
  };
  
  export const exportToJSON = (columns, rows) => {
    const jsonData = rows.map(row => 
      columns.reduce((obj, col, index) => ({ ...obj, [col]: row[index] }), {})
    );
    return JSON.stringify(jsonData, null, 2);
  };