import React, { useState, useEffect, useCallback } from 'react';
import Table from './components/Table';
import ColumnSelector from './components/ColomnSelector';
import { fetchFakeData } from './mock/mockData';

const BATCH_SIZE = 20;

const COLUMNS = [
  { id: "name", ordinalNo: 1, title: "Name", type: "string" },
  { id: "age", ordinalNo: 2, title: "Age", type: "number" },
  { id: "email", ordinalNo: 3, title: "Email", type: "email" },
  { id: "isActive", ordinalNo: 4, title: "Active", type: "boolean" },
  { id: "role", ordinalNo: 5, title: "Role", type: "select", options: ["Admin", "User", "Guest"] },
];

export default function App() {

  const initialTableData = {
    columns: COLUMNS,
    data: []
  }

  //get table data from local storage or use initial data
  const [tableData, setTableData] = useState(
    //localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData')) : initialTableData
    initialTableData
  );

  const [visibleColumns, setVisibleColumns] = useState(
    //localStorage.getItem('visibleColumns') ? JSON.parse(localStorage.getItem('visibleColumns')) : tableData.columns.map((column) => column.id)
    tableData.columns.map((column) => column.id)
  );

  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

    //load more data
  const loadMoreData = useCallback(async () => {
    setLoading(true);
    try {
      setOffset(prevOffset => {
        const newOffset = prevOffset + BATCH_SIZE;
  
        fetchFakeData(prevOffset, BATCH_SIZE)
          .then((newData) => {
            setTableData(prevData => ({...prevData, data: [...prevData.data, ...newData], }));
            setLoading(false);
          });
  
        return newOffset;
      });
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  }, []);

  //loading first batch of data
  useEffect(() => {
    loadMoreData()
  }, [loadMoreData]);

  //save table data to local storage
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  //save visible columns to local storage
  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  //load more data on scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
      if (bottom && !loading) {
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMoreData]);


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
