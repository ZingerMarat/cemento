import React from 'react';
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
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Table 
        columns={initialTableData.columns} 
        data={initialTableData.data} 
      />
    </div>
  );
}
