import React, { useState, useEffect } from 'react';
import Table from './components/Table';

const initialTableData = {
  columns: [
    { id: "name", ordinalNo: 1, title: "Name", type: "string" },
    { id: "age", ordinalNo: 2, title: "Age", type: "number" },
    { id: "email", ordinalNo: 3, title: "Email", type: "email" },
    { id: "isActive", ordinalNo: 4, title: "Active", type: "boolean" },
    { id: "role", ordinalNo: 5, title: "Role", type: "select", options: ["Admin", "User", "Guest"] },
  ],
  data: [
    { id: "1", name: "Alice", email: "alice@example.com", age: 28, isActive: true, role: "Admin" },
    { id: "2", name: "Bob", email: "bob@example.com", age: 35, isActive: false, role: "User" },
  ],
};

export default function App() {

  //const [tableData, setTableData] = useState(initialTableData);

  const [tableData, setTableData] = useState(
    localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData')) : initialTableData
  );

  //save table data to local storage
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  //handle cell change
  const handleCellChange = (rowId, columnId, newValue) => {
    setTableData((prevData) => ({
      ...prevData,
      data: prevData.data.map((row) => row.id === rowId ? { ...row, [columnId]: newValue } : row),
    }));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Table 
        columns={tableData.columns} 
        data={tableData.data}
        onCellChange={handleCellChange}
      />
    </div>
  );
}
