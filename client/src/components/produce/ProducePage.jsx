import React, { useState, useEffect, useContext } from 'react';
import { Row, Container, Col, Card } from 'react-bootstrap';
import FarmerFilter from './FarmerFilter';
import NavbarTwo from '../header/NavbarTwo';
import { AppContext } from '../../context/AppContext';
import FeaturedItems from './FeaturedItems';
import { useHistory } from 'react-router-dom';
import TypeFilter from './TypeFilter';
import './producepage.css';
import Footer from '../footer/Footer';

const Produce = () => {
  const { farmers, produceList, shoppingCart, setShoppingCart } = useContext(
    AppContext
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [chosenStore, setChosenStore] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState({});
  const [chosenType, setChosenType] = useState('');
  const [displayedList, setDisplayedList] = useState([]);

  const handleUpdateCart = (produce) => {
    const currentItemInCart = shoppingCart[produce._id];

    if (!currentItemInCart) {
      return setShoppingCart({
        ...shoppingCart,
        [produce._id]: { count: 1, produce }
      });
    }

    setShoppingCart({
      ...shoppingCart,
      [produce._id]: { count: currentItemInCart.count + 1, produce }
    });
  };

  const decrementUpdateCart = (produce) => {
    let currentItemInCart = shoppingCart[produce._id];

    if (currentItemInCart.count === 1) {
      currentItemInCart = {
        ...shoppingCart,
        [produce._id]: { count: 0, produce }
      };
      delete currentItemInCart[produce._id];
      return setShoppingCart(currentItemInCart);
    }
    if (currentItemInCart) {
      return setShoppingCart({
        ...shoppingCart,
        [produce._id]: { count: currentItemInCart.count - 1, produce }
      });
    }
  };

  const currentItemCart = (product) => {
    const currentItemInCart = shoppingCart[product._id];
    if (currentItemInCart) {
      return true;
    } else {
      return false;
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (chosenStore === '' && !searchTerm) {
      return (setDisplayedList(produceList), setSelectedFarmer({}));
    }
    const currentFarmer = farmers.filter(
      (farmer) => farmer._id === chosenStore
    );
    setSelectedFarmer(currentFarmer[0]);
    (selectedFarmer || searchTerm) &&
      setDisplayedList(
        produceList.filter((produce) => {
          return (
            (produce.farmerStore === chosenStore || !chosenStore) &&
            produce.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
  }, [chosenStore, farmers, searchTerm, produceList]);

  useEffect(() => {
    setDisplayedList(
      produceList.filter((produce) => {
        return produce.foodType === chosenType || !chosenType;
      })
    );
  }, [chosenType]);

  return (
    <div>
      <NavbarTwo />
      <Container className="produce-div">
        <FeaturedItems />
        <Row>
          <Col lg="3">
            <FarmerFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              chosenStore={chosenStore}
              setChosenStore={setChosenStore}
              farmers={farmers}
            />
            <TypeFilter setChosenType={setChosenType} />
          </Col>
          <Col lg="9">
            {selectedFarmer && (
              <h1>{selectedFarmer.storeName || 'All Stores'} </h1>
            )}
            <Row>
              {displayedList &&
                displayedList.map((item) => (
                  <Col key={item._id} lg="4">
                    <Card
                      style={{
                        width: 200,
                        height: 300,
                        margin: 5,
                        border: 'none',
                        overflow: 'hidden',
                        marginLeft: '20px'
                      }}
                    >
                      <Card.Img
                        className="produce-img"
                        variant="top"
                        src={item.images[0]}
                        alt="food-item"
                        style={{ maxHeight: '50%', objectFit: 'cover' }}
                        onClick={() => history.push(`/produce/${item._id}`)}
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>${item.price}</Card.Text>
                        <Card.Text>
                          {shoppingCart[item._id]
                            ? shoppingCart[item._id].count
                            : 0}
                        </Card.Text>
                      </Card.Body>
                      <div className="button-flex">
                        <button
                          className="add-to-cart-button"
                          onClick={() => handleUpdateCart(item)}
                        >
                          +
                        </button>
                        {currentItemCart(item) ? (
                          <button
                            className="remove-from-cart-button"
                            onClick={() => decrementUpdateCart(item)}
                          >
                            -
                          </button>
                        ) : null}
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Produce;
