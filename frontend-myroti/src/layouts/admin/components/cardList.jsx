import React from 'react';

const CardList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
};

export default CardList;