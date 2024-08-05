// frontend/src/App.jsx
import React from 'react';
import axios from 'axios';

const App = () => {
  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/reports/inventory/pdf', {
        responseType: 'blob', // Important to handle binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory_report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div>
        <h1>Inventory Reports</h1>
        <button onClick={generateReport} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Download Inventory Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default App;
