import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './CartDropdown.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CartDrodown = () => {
  const { shoppingCart } = useContext(AppContext);
  const history = useHistory();

  const grandTotal = Object.values(shoppingCart).reduce((acc, item) => {
    return (acc = acc += item.produce.price * item.count);
  }, 0);
  console.log(grandTotal);

  const sendOrder = async (e) => {
    const prodIds = Object.values(shoppingCart).reduce((acc, item) => {
      for (let i = 0; i < item.count; i++) {
        acc.push(item.produce.id);
      }
      return acc;
    }, []);
    const token = localStorage.getItem('token');
    await axios({
      method: 'POST',
      url: `/orders`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        products: prodIds
      }
    }).then(({ data }) => {
      console.log(data);
    });
  };
  return (
    <div className="order-container">
      <h2 className="order-summ-title" style={{ textAlign: 'center' }}>
        Order Summary
      </h2>
      {Object.values(shoppingCart).map((item) => {
        const total = item.produce.price * item.count;

        return (
          <div>
            <div className="item-block">
              <div>
                <img
                  src={item.produce.images[0]}
                  className="image-checkout-div"
                  alt="product"
                />
              </div>

              <div className="item-div">
                <p>{item.produce.name}</p>
                <p>${item.produce.price.toFixed(2)}</p>
                <div className="count">{item.count}</div>
              </div>
              <div style={{ fontSize: '22px' }}>${total.toFixed(2)}</div>
            </div>
          </div>
        );
      })}

      <div className="dropdown-checkout-div">
        <p
          className="subtotal"
          style={{
            textAlign: 'center',
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#464646'
          }}
        >
          Subtotal: ${grandTotal.toFixed(2)}
        </p>
        <button
          className="dropdown-checkout-button"
          onClick={() =>{history.push(`/checkout`); sendOrder()}}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartDrodown;
