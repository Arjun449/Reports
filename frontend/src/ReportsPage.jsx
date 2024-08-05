// frontend/src/ReportsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reports/inventory');
                setReports(response.data);
            } catch (err) {
                setError('Failed to fetch reports.');
                console.error('Error fetching reports:', err);
            }
        };

        fetchReports();
    }, []);

    const downloadPDF = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/reports/inventory/pdf', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventory_report.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            setError('Failed to download PDF.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <div>
                <h1>Reports</h1>
                {error && <p>{error}</p>}
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>{report.name}</li>
                    ))}
                </ul>
                <button onClick={downloadPDF} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Download Inventory Report (PDF)
                </button>
            </div>
        </div>
    );
}

export default ReportsPage;
