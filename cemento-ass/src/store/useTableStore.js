import { create } from 'zustand';

const INITIAL_COLUMNS = [
  { id: "name", ordinalNo: 1, title: "Name", type: "string", width: 150 },
  { id: "age", ordinalNo: 2, title: "Age", type: "number", width: 80 },
  { id: "email", ordinalNo: 3, title: "Email", type: "email", width: 200 },
  { id: "isActive", ordinalNo: 4, title: "Active", type: "boolean", width: 80 },
  { id: "role", ordinalNo: 5, title: "Role", type: "select", options: ["Admin", "User", "Guest"], width: 100 },
];

const INITIAL_DATA = [
  { id: 0, name: "Rachel White", age: 26, email: "rachel.white@example.com", isActive: false, role: "User" },
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

];

export const useTableStore = create((set) => ({
    tableData: { columns: INITIAL_COLUMNS, data: INITIAL_DATA },

    setTableData: (newData) => set({ tableData: newData }),

    updateCell: (rowId, columnId, newValue) => set((state) => {
        const newData = state.tableData.data.map((row) =>
          row.id === rowId ? { ...row, [columnId]: newValue } : row
        );
        
        //console log the data was changed
        console.log(newData[rowId]);

        return {
          tableData: {
            ...state.tableData,
            data: newData,
          },
        };
      }),
}));