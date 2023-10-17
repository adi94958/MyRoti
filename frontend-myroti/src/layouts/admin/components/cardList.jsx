import React from 'react';

const CardList = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between">
      {data.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="w-1/2 p-4"> 
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-xl font-semibold">{item.title}</h1> 
        <h3 className="pt-4 text-xl text-gray-600">{item.description}</h3>
      </div>
    </div>
  );
};

export default CardList;
