import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import ColumnSelector from './components/ColomnSelector';

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

  //get table data from local storage or use initial data
  const [tableData, setTableData] = useState(
    localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData')) : initialTableData
  );

  const [visibleColumns, setVisibleColumns] = useState(
    localStorage.getItem('visibleColumns') ? JSON.parse(localStorage.getItem('visibleColumns')) : tableData.columns.map((column) => column.id)
  );

  //save table data to local storage
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  //save visible columns to local storage
  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  //handle cell change
  const handleCellChange = (rowId, columnId, newValue) => {
    setTableData((prevData) => ({
      ...prevData,
      data: prevData.data.map((row) => row.id === rowId ? { ...row, [columnId]: newValue } : row),
    }));
  };

  //handle column toggle
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => prev.includes(columnId) ? prev.filter(id => id !== columnId) : [...prev, columnId]
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
      <div style={{ display: "flex", gap: 32, maxWidth: 1000, width: "100%" }}>
        
        <ColumnSelector
          columns={tableData.columns}
          visibleColumns={visibleColumns}
          onColumnToggle={handleColumnToggle}
        />
  
        <div style={{ flexGrow: 1 }}>
          <Table
            columns={tableData.columns
              .filter(column => visibleColumns.includes(column.id))
              .sort((a, b) => a.ordinalNo - b.ordinalNo)}
            data={tableData.data}
            onCellChange={handleCellChange}
          />
        </div>
      </div>
    </div>
  );
  
  
}
