/* I have provided three queries along with some results 
Considering the brownie point,I also have provided a large dataset query
*/
export const sampleQueries = [
    {
      id: '1',
      name: 'Users Query',
      sql: 'SELECT * FROM users;',
      result: {
        columns: ['ID', 'Name', 'Email'],
        rows: [
          [1, 'Rahul Singh', 'Rahul@example.com'],
          [2, 'Aditya Tiwari', 'Aditya@example.com'],
        ]
      }
    },
    {
      id: '2',
      name: 'Products Query',
      sql: 'SELECT product_id, name FROM products;',
      result: {
        columns: ['Product ID', 'Product Name'],
        rows: [
          [101, 'Laptop'],
          [102, 'Smartphone'],
          [103, 'Tablet'],
          [104, 'Headphones'],
          [105, 'Keyboard'],
        ]
      }
    },
    /*This is random large set considering the brownie point and in which
    I have used Array.from to create an array of 1000 elements and then used map to create an array of arrays of 2 elements
    */
    {
      id: '3',
      name: 'Large Dataset',
      sql: 'SELECT * FROM big_data;',
      result: {
        columns: ['ID', 'Value'],
        rows: Array.from({ length: 1000 }, (_, i) => [i + 1, `Value ${i + 1}`])
      }
    }
  ];