import React, { useEffect, useState } from 'react';
import CardList from './components/cardList';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    handleData();
  }, []);

  function handleData() {
    axios.get('http://localhost:8000/api/dashboard/admin')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Remove dashboardInside function

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      
      <CardList
        data={[
          {
            title: 'Koordinator',
            description: data.koordinator,
          },
          {
            title: 'Pemilik',
            description: '5 Akun',
          },
          {
            title: 'Keuangan',
            description: '5 Akun',
          },
          {
            title: 'Kurir',
            description: data.kurir,
          },
        ]}
      />
    </div>
  );
}
