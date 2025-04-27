import React, { useState } from 'react';
import './App.css'; // Стили для компонента

interface TableRow {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
}

const initialData: TableRow[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', position: 'Developer', email: 'john.doe@example.com' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', position: 'Designer', email: 'jane.smith@example.com' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', position: 'Manager', email: 'alice.johnson@example.com' },
  { id: 4, firstName: 'Bob', lastName: 'Brown', position: 'Developer', email: 'bob.brown@example.com' },
];

const App: React.FC = () => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'id',
    direction: 'asc',
  });

  const sortData = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="App">
      <h1>Таблица с сортировкой</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('id')}>Номер</th>
            <th onClick={() => sortData('firstName')}>Имя</th>
            <th onClick={() => sortData('lastName')}>Фамилия</th>
            <th onClick={() => sortData('position')}>Должность</th>
            <th onClick={() => sortData('email')}>Емейл</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.position}</td>
              <td>{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

