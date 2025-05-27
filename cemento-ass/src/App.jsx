import React, { useState, useEffect, useCallback } from 'react';
import Table from './components/Table';
import ColumnSelector from './components/ColumnSelector';
import { fetchFakeData } from './mock/mockData';

const BATCH_SIZE = 20;

const INITIAL_COLUMNS = [
  { id: "name", ordinalNo: 1, title: "Name", type: "string", width: 50 },
  { id: "age", ordinalNo: 2, title: "Age", type: "number", width: 20 },
  { id: "email", ordinalNo: 3, title: "Email", type: "email", width: 50 },
  { id: "isActive", ordinalNo: 4, title: "Active", type: "boolean", width: 20 },
  { id: "role", ordinalNo: 5, title: "Role", type: "select", options: ["Admin", "User", "Guest"], width: 20 },
];

const INITIAL_DATA = [
  { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com", isActive: true, role: "Admin" },
  { id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com", isActive: false, role: "User" },
  { id: 3, name: "Alice Johnson", age: 28, email: "alice.johnson@example.com", isActive: true, role: "Guest" },
  { id: 4, name: "Bob Brown", age: 35, email: "bob.brown@example.com", isActive: false, role: "Admin" },
  { id: 5, name: "Charlie Davis", age: 22, email: "charlie.davis@example.com", isActive: true, role: "User" },
  { id: 6, name: "Diana White", age: 29, email: "diana.white@example.com", isActive: false, role: "Guest" },
  { id: 7, name: "Ethan Green", age: 31, email: "ethan.green@example.com", isActive: true, role: "Admin" },
  { id: 8, name: "Fiona Black", age: 27, email: "fiona.black@example.com", isActive: false, role: "User" },
  { id: 9, name: "George Gray", age: 24, email: "george.gray@example.com", isActive: true, role: "Guest" },
  { id: 10, name: "Hannah Blue", age: 32, email: "hannah.blue@example.com", isActive: false, role: "Admin" },
  { id: 11, name: "Ian Red", age: 26, email: "ian.red@example.com", isActive: true, role: "User" },
  { id: 12, name: "Julia Yellow", age: 23, email: "julia.yellow@example.com", isActive: false, role: "Guest" },
  { id: 13, name: "Kevin Purple", age: 33, email: "kevin.purple@example.com", isActive: true, role: "Admin" },
  { id: 14, name: "Liam Orange", age: 28, email: "liam.orange@example.com", isActive: false, role: "User" },
  { id: 15, name: "Mia Pink", age: 21, email: "mia.pink@example.com", isActive: true, role: "Guest" },
  { id: 16, name: "Noah Gray", age: 34, email: "noah.gray@example.com", isActive: false, role: "Admin" },
  { id: 17, name: "Olivia Brown", age: 27, email: "olivia.brown@example.com", isActive: true, role: "User" },
  { id: 18, name: "Peter Black", age: 24, email: "peter.black@example.com", isActive: false, role: "Guest" },
  { id: 19, name: "Quinn Green", age: 32, email: "quinn.green@example.com", isActive: true, role: "Admin" },
  { id: 20, name: "Rachel White", age: 26, email: "rachel.white@example.com", isActive: false, role: "User" },
];

export default function App() {
  
  const initialTableData = {
    columns: INITIAL_COLUMNS,
    data: INITIAL_DATA
  }

  const [tableData, setTableData] = useState(initialTableData);
  const [visibleColumns, setVisibleColumns] = useState(JSON.parse(localStorage.getItem('visibleColumns')) || tableData.columns.map(column => column.id));
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const loadMoreData = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const newOffset = offset + BATCH_SIZE;
      const newData = await fetchFakeData(offset, BATCH_SIZE);
      
      setTableData(prevData => ({
        ...prevData,
        data: [...prevData.data, ...newData],
      }));
      
      setOffset(newOffset);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, offset]);

  //load more data on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return; //prevent loading more data when dragging
      
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 50;

      if (bottom && !loading) {
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMoreData, isDragging]);

  //save visible columns to local storage
  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  //handle cell change
  const handleCellChange = (rowId, columnId, newValue) => {
    const newData = tableData.data.map(row =>
      row.id === rowId ? { ...row, [columnId]: newValue } : row
    );
  
    const newTableData = {
      ...tableData,
      data: newData
    };

    //console log the new row
    //console.log(newData);
  
    setTableData(newTableData);
  };

  //handle column toggle
  const handleColumnToggle = (columnId) => {
    const newVisibleColumns = visibleColumns.includes(columnId) 
      ? visibleColumns.filter(id => id !== columnId) 
      : [...visibleColumns, columnId];

    setVisibleColumns(newVisibleColumns);
  };

  //handle column order change
  const handleColumnOrderChange = (newColumns) => {
    const updatedColumns = newColumns.map((col, index) => ({
      ...col,
      ordinalNo: index + 1
    }));

    setTableData(prev => ({
      ...prev,
      columns: updatedColumns
    }));

    // save new column order to local storage
    //localStorage.setItem('columnOrder', JSON.stringify(updatedColumns));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", padding: "20px 20px 0 20px" }}>
      <div style={{ display: "flex", gap: 32, maxWidth: 1200, width: "100%" }}>

        <div style={{ 
          width: "200px", 
          flexShrink: 0,
          position: "sticky", //make the column selector sticky on scroll
          top: "20px",  //gap between the column selector and top of the page
          alignSelf: "flex-start",
          height: "fit-content"
        }}>
          <ColumnSelector
            columns={tableData.columns}
            visibleColumns={visibleColumns}
            onColumnToggle={handleColumnToggle}
            onOrderChange={handleColumnOrderChange}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          />
        </div>

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
