import { render, screen } from '@testing-library/react';
import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { useTableStore } from '../store/useTableStore';

//clear the store before each test
beforeEach(() => {
  useTableStore.setState({
    tableData: {
      columns: [
        { id: "name", ordinalNo: 1, title: "Name", type: "string", width: 150 },
        { id: "age", ordinalNo: 2, title: "Age", type: "number", width: 80 },
        { id: "email", ordinalNo: 3, title: "Email", type: "email", width: 200 },
        { id: "isActive", ordinalNo: 4, title: "Active", type: "boolean", width: 80 },
        { id: "role", ordinalNo: 5, title: "Role", type: "select", options: ["Admin", "User", "Guest"], width: 100 }
      ],
      data: [{
        id: 0,
        name: 'Rachel White',
        age: 26,
        email: 'rachel.white@example.com',
        isActive: false,
        role: 'User'
      }]
    }
  });
});

//mock the fetchFakeData function
jest.mock('../mock/mockData', () => ({
  fetchFakeData: jest.fn()
}));

describe('Table Initial Data Loading', () => {
  test('displays initial data from Zustand store correctly', () => {
    render(<App />);
    
    //check the initial data
    const tableBody = screen.getByRole('table').querySelector('tbody');
    expect(tableBody.children.length).toBe(1);

    //check the data in the first row
    const firstRowInputs = tableBody.children[0].querySelectorAll('input');
    expect(firstRowInputs[0].value).toBe('Rachel White');
    expect(firstRowInputs[1].value).toBe('26');
    expect(firstRowInputs[2].value).toBe('rachel.white@example.com');

    //check the headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Age');
    expect(headers[2].textContent).toBe('Email');
    expect(headers[3].textContent).toBe('Active');
    expect(headers[4].textContent).toBe('Role');
  });
});

describe('Table Cell Editing', () => {
  test('updates cell value when changed', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    //get all the textboxes in the first row
    const firstRowInputs = screen.getAllByRole('textbox');
    const nameInput = firstRowInputs[0];  //name

    //check the initial values
    expect(nameInput.value).toBe('Rachel White');

    //change the value of the name
    await user.clear(nameInput);
    await user.type(nameInput, 'New Name');
    
    //check that the name was updated in the DOM
    expect(nameInput.value).toBe('New Name');

    //check that the name was updated in the store
    const storeData = useTableStore.getState().tableData.data;
    expect(storeData[0].name).toBe('New Name');
  });

  test('updates all types of cells correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    //get the first row of the table
    const firstRow = screen.getByRole('table').querySelector('tbody tr');
    
    //get all the inputs in the first row
    const inputs = firstRow.querySelectorAll('input, select');
    const nameInput = inputs[0];
    const ageInput = inputs[1];
    const emailInput = inputs[2];
    const activeCheckbox = inputs[3];
    const roleSelect = firstRow.querySelector('select');

    //save the initial values
    const initialValues = {
      name: nameInput.value,
      age: ageInput.value,
      email: emailInput.value,
      isActive: activeCheckbox.checked,
      role: roleSelect.value
    };

    //change the text field (name)
    await user.clear(nameInput);
    await user.type(nameInput, 'Test Name');
    expect(nameInput.value).toBe('Test Name');

    //change the number field (age)
    await user.clear(ageInput);
    await user.type(ageInput, '45');
    expect(ageInput.value).toBe('45');

    //change the email
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');

    //change the checkbox (isActive)
    await user.click(activeCheckbox);
    expect(activeCheckbox.checked).toBe(!initialValues.isActive);

    //change the select (role)
    await user.selectOptions(roleSelect, 'Admin');
    expect(roleSelect.value).toBe('Admin');

    //check that the values were updated
    expect(nameInput.value).not.toBe(initialValues.name);
    expect(ageInput.value).not.toBe(initialValues.age);
    expect(emailInput.value).not.toBe(initialValues.email);
    expect(activeCheckbox.checked).not.toBe(initialValues.isActive);
    expect(roleSelect.value).not.toBe(initialValues.role);

    //check that the values were saved in the store
    const storeData = useTableStore.getState().tableData.data;
    expect(storeData[0]).toEqual({
      id: 0,
      name: 'Test Name',
      age: 45,
      email: 'test@example.com',
      isActive: !initialValues.isActive,
      role: 'Admin'
    });
  });

  test('toggles column visibility when checkbox in Column Selector is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    //get the first row and save the value of the email
    const firstRow = screen.getByRole('table').querySelector('tbody tr');
    const initialEmailInput = firstRow.querySelector('input[type="email"]');
    const initialEmailValue = initialEmailInput.value;
    
    //check the initial state - all columns are visible
    const initialHeaders = screen.getAllByRole('columnheader');
    expect(initialHeaders).toHaveLength(5);
    expect(initialHeaders[0].textContent).toBe('Name');
    expect(initialHeaders[1].textContent).toBe('Age');
    expect(initialHeaders[2].textContent).toBe('Email');
    expect(initialHeaders[3].textContent).toBe('Active');
    expect(initialHeaders[4].textContent).toBe('Role');

    //find all the checkboxes in the Column Selector
    const columnToggles = screen.getAllByRole('checkbox');
    const emailToggle = columnToggles.find(checkbox => 
      checkbox.closest('div').textContent.includes('Email')
    );
    
    //disable the email column
    await user.click(emailToggle);
    
    //check that the email column is hidden
    const updatedHeaders = screen.getAllByRole('columnheader');
    expect(updatedHeaders).toHaveLength(4);
    expect(updatedHeaders[0].textContent).toBe('Name');
    expect(updatedHeaders[1].textContent).toBe('Age');
    expect(updatedHeaders[2].textContent).toBe('Active');
    expect(updatedHeaders[3].textContent).toBe('Role');

    //check that the email field is not in the first row
    const emailInput = firstRow.querySelector('input[type="email"]');
    expect(emailInput).toBeNull();

    //enable the email column
    await user.click(emailToggle);
    
    //check that the email column is visible again
    const finalHeaders = screen.getAllByRole('columnheader');
    expect(finalHeaders).toHaveLength(5);
    expect(finalHeaders[2].textContent).toBe('Email');
    
    //check that the email field is visible again and contains the same value as before
    const restoredEmailInput = firstRow.querySelector('input[type="email"]');
    expect(restoredEmailInput).not.toBeNull();
    expect(restoredEmailInput.value).toBe(initialEmailValue);
  });
});
