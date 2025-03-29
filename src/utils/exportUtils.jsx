
// To import the file in the form of csv or json format ,I have provided the options to do so
export const exportToCSV = (columns, rows) => {
  const csvContent = [
      columns.join(','),  // Join column headers
      ...rows.map(row => row.join(',')) // Join each row's values
  ].join('\n');

  return csvContent;  // ✅ Return raw CSV data instead of a Blob URL
};

  export const exportToJSON = (columns, rows) => {
    const jsonData = rows.map(row => 
      columns.reduce((obj, col, index) => ({ ...obj, [col]: row[index] }), {})
    );
    return JSON.stringify(jsonData, null, 2);
  };