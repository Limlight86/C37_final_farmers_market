import React, { useContext, useMemo, useCallback } from 'react';
import { AppContext } from '../../context/AppContext';
import './FeatureItems.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const FeaturedItems = () => {
  const { produceList, farmers } = useContext(AppContext);

  const getRandomItemRecursive = useCallback((acc) => {
    const randomIndex = Math.floor(Math.random() * produceList.length);
    const randomItem = produceList[randomIndex];
    const isDuplicate = acc.some((produce) => produce._id === randomItem._id);
    if (isDuplicate) return getRandomItemRecursive(acc);
    return randomItem;
  }, [produceList]);

  const featuredItems = useMemo(
    () =>
      produceList.slice(0, 2).reduce((acc) => {
        acc.push(getRandomItemRecursive(acc));
        return acc;
      }, []),
    [produceList, getRandomItemRecursive]
  );

  return (
    <div>
      <h1 className="featured-items">Featured Items</h1>
      <div className="featured">
        {featuredItems.map((item) => (
          <Card style={{ width: '30rem', maxHeight: '150' }}>
            <Card.Img
              variant="top"
              style={{ maxHeight: '100%' }}
              src={item.images[0]}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>
                {farmers &&
                  farmers.map((farm) => {
                    if (farm._id === item.farmerStore) {
                      return farm.storeName;
                    }
                    return null
                  })}
              </Card.Text>
              <Link
                to={{
                  pathname: `/produce/${item._id}`
                }}
              >
                <p>Tell Me More</p>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
