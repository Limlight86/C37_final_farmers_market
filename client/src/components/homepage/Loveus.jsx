import React from 'react';
import './loveus.css';
import { useHistory } from 'react-router-dom';
import producebag from '../../assets/images/producebag.png';
import womanfarmer from '../../assets/images/womanfarmer.png';
import citymap from '../../assets/images/citymap.png';

const Loveus = () => {
  const history = useHistory();

  return (
    <div className="loveus">
      <h2 className="title">Reasons to love us</h2>
      <div className="loveflex">
        <div className="baby-div">
          <img
            src={womanfarmer}
            alt="woman farmer"
            width="279"
            height="342"
          ></img>
          <p className="p-div">
            Our farmers practice <b>sustainable agriculture</b>. Many are
            organic and non-GMO.
          </p>
        </div>
        <div>
          <img src={citymap} alt="city map" width="279" height="342"></img>
          <p className="p-div">
            <b>Local</b>. All produce comes from within a two hour range of dear
            305.
          </p>
        </div>
        <div>
          <img
            src={producebag}
            alt="pack of produce"
            width="279"
            height="342"
          ></img>
          <p className="p-div">
            Produce comes in <b>minimal packaging</b> leaving less impact on
            mother earth.
          </p>
        </div>
      </div>
      <button className="meetfarmers" onClick={() => history.push(`/farms`)}>
        Meet farmers
      </button>
    </div>
  );
};

export default Loveus;
