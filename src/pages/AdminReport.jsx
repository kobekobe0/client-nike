import AdminOverview from '../components/AdminOverview'
import AdminRevenue from '../components/AdminRevenue';
import AdminPayments from '../components/AdminPayments';
import AdminTopSelling from '../components/AdminTopSelling';
import { useState } from 'react';
import API_URL from "../constants/api";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import swoosh from '../assets/swoosh.png'


function AdminReport() {
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

const printProductReport = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_URL}report/sales`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const doc = new jsPDF();
      const tableColumn = ["Name", "Price", "Stock", "Total Sold", "Total Revenue"];
      const tableRows = [];

      response.report.forEach(product => {
        const productData = [
          product.name,
          product.price,
          product.stock,
          product.totalSold,
          product.totalRevenue,
        ];
        tableRows.push(productData);
      });

      // Add totalRevenue and totalItemsSold as a row in the table
      tableRows.push([
        'Total',
        '',
        '',
        response.totalItemsSold,
        response.totalRevenue,
      ]);

      // Determine the date range for the report
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      const reportStartDate = startTime ? new Date(startTime) : sevenDaysAgo;
      const reportEndDate = endTime ? new Date(endTime) : today;

      const startDateString = reportStartDate.toISOString().split('T')[0];
      const endDateString = reportEndDate.toISOString().split('T')[0];
      const dateRangeText = `Date Range: ${startDateString} - ${endDateString}`;

      doc.autoTable(tableColumn, tableRows, {
        startY: 30, // leave space for the header
        styles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, // White fill color and black text for rows
        columnStyles: {
          0: { fillColor: [100, 100, 100], textColor: [255, 255, 255] }, // Dark gray fill color and white text for header
        },
        addPageContent: function(data) {
          doc.text('Product Report', data.settings.margin.left, 20);
          doc.text(dateRangeText, data.settings.margin.left, 25); // Add date range below the title
        }
      });

      doc.save('Product_Report.pdf');
    }
  };

  // Build the request body conditionally
  const requestBody = {};
  if (startTime) requestBody.startTime = new Date(startTime).toISOString();
  if (endTime) requestBody.endTime = new Date(endTime).toISOString();

  xhr.send(JSON.stringify(requestBody));
};
  return (
    <div className='p-8 mx-24'>
      <div className='flex justify-between shadow-sm bg-white p-4 rounded-md'>
        <h2 className='font-medium font-sans text-lg'>Dashboard</h2>
        <div className='flex items-center gap-2 text-gray-600'>
            <p className='font-medium'>from: </p>
            <input className='p-1' type="date" name="" id="" onChange={(e)=> setStartTime(e.target.value)}/>
            <p className='font-medium'>to: </p>
            <input className='p-1' type="date" name="" id="" onChange={(e)=> setEndTime(e.target.value)}/>
            <button className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-sm text-xs' onClick={printProductReport}>Print Product Sales Report</button>     
        </div>
      </div>
      <AdminOverview/>
      <AdminRevenue/>

      <div className='flex justify-between shadow-sm bg-white p-4 rounded-md mt-4 gap-4'>
        <AdminPayments/>
        <AdminTopSelling/>
      </div>
    </div>
  )
}

export default AdminReport
