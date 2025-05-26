import { render, screen, waitFor } from '@testing-library/react';
import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import App from '../App';
import { fetchFakeData } from '../mock/mockData';


jest.mock('../mock/mockData', () => ({
  fetchFakeData: jest.fn()
}));

describe('App Component Data Loading Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('calls fetchFakeData on initial render', async () => {
    fetchFakeData.mockResolvedValueOnce([]);
    render(<App />);
    
    await waitFor(() => {
      expect(fetchFakeData).toHaveBeenCalledTimes(1);
      expect(fetchFakeData).toHaveBeenCalledWith(0, 20);
    });
  });

  test('displays single row of data after initial load', async () => {
    const mockData = [
      { id: '1', name: 'Test User', email: 'test@example.com', age: 25, isActive: true, role: 'User' }
    ];
    
    fetchFakeData.mockResolvedValueOnce(mockData);
    render(<App />);

    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('Test User');
      expect(inputs[1]).toHaveValue('test@example.com');
    });

    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toHaveValue(25);
  });

  test('handles empty data response', async () => {
    fetchFakeData.mockResolvedValueOnce([]);
    render(<App />);

    await waitFor(() => {
      expect(fetchFakeData).toHaveBeenCalled();
    });
    
    const table = screen.getByRole('table');
    const tbody = table.querySelector('tbody');
    expect(tbody.children.length).toBe(0);
    
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
  });

});
