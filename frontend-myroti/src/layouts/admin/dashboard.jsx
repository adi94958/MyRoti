import React from 'react'
import CardList from './components/cardList';

export default function Dashboard() {
    const data = [
        {
          title: 'Koordinator',
          description: '5 Akun',
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
            description: '5 Akun',
        },
      ];
	return (
		<div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
            <CardList data={data} />
		</div>
	)
}