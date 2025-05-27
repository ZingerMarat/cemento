import React, { useState, useEffect, useCallback } from 'react';
import Table from './components/Table';
import ColumnSelector from './components/ColumnSelector';
import { fetchFakeData } from './mock/mockData';
import { useTableStore } from './store/useTableStore';

const BATCH_SIZE = 20;

export default function App() {

  const tableData = useTableStore(state => state.tableData);
  const setTableData = useTableStore(state => state.setTableData);


  const [visibleColumns, setVisibleColumns] = useState(JSON.parse(localStorage.getItem('visibleColumns')) || tableData.columns.map(column => column.id));
  const [offset, setOffset] = useState(tableData.data.length);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const loadMoreData = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const newOffset = offset + BATCH_SIZE;
      const newData = await fetchFakeData(offset, BATCH_SIZE);

      setTableData({
        ...tableData,
        data: [...tableData.data, ...newData],
      });
      
      setOffset(newOffset);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, offset, tableData, setTableData]);

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

    setTableData({
      ...tableData,
      columns: [...updatedColumns],
    });

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
          />
        </div>

      </div>
    </div>
  );
  
  
}
