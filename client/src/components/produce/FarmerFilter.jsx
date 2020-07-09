import React from 'react';
import './producepage.css';

const FarmerFilter = ({
  farmers,
  setSearchTerm,
  setChosenStore,
  searchTerm
}) => {
  return (
    <div>
      <h1 className="produce-title">Farmers</h1>
      <div className="farm-rectangle">
        <p
          onClick={() => {
            setChosenStore('');
            setSearchTerm('');
          }}
        >
          All Stores
        </p>
        {farmers &&
          farmers.map((farmer) => {
            return (
              <p
                style={{cursor:"pointer"}}
                key={farmer._id}
                onClick={() => {
                  setChosenStore(farmer._id);
                  setSearchTerm('');
                }}
              >
                {farmer.storeName}
              </p>
            );
          })}
      </div>
      <h1 className="produce-title">Search Bar</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '255px', height: '50px', marginBottom: '15px' }}
      />
    </div>
  );
};

export default FarmerFilter;
