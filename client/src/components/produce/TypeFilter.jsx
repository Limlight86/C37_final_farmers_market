import React from 'react';

const TypeFilter = ({ setChosenType }) => {
  const checkboxOne = document.getElementById('checkbox-1');
  const checkboxTwo = document.getElementById('checkbox-2');
  const checkboxThree = document.getElementById('checkbox-3');
  const checkboxFour = document.getElementById('checkbox-4');
  const checkboxFive = document.getElementById('checkbox-5');

  const checkArr = [
    checkboxOne,
    checkboxTwo,
    checkboxThree,
    checkboxFour,
    checkboxFive
  ];

  const handleTypeFilter = (type, checkbox) => {
    const isBoxChecked = checkArr.filter((box) => checkbox !== box);
    isBoxChecked.forEach((box) => (box.checked = false));
    setChosenType(type);
  };

  return (
    <div className="type-container">
      <h1 className="produce-title">Type</h1>
      <div className="type-div">
        <div className="veggie-div">
          <label htmlFor="Vegetables">Vegetable</label>
          <input
            onChange={() => handleTypeFilter('Vegetable', checkboxOne)}
            type="checkbox"
            value="Vegetables"
            id="checkbox-1"
          />
        </div>
        <div className="fruit-div">
          <label htmlFor="Fruit">Fruit</label>
          <input
            onChange={() => handleTypeFilter('Fruit', checkboxTwo)}
            type="checkbox"
            value="Fruit"
            id="checkbox-2"
          />
        </div>
        <div className="dairy-div">
          <label htmlFor="Dairy">Dairy</label>
          <input
            onChange={() => handleTypeFilter('Dairy', checkboxThree)}
            type="checkbox"
            value="Dairy"
            id="checkbox-3"
          />
        </div>
        <div className="meat-div">
          <label htmlFor="Meat">Meat</label>
          <input
            onChange={() => handleTypeFilter('Meat', checkboxFour)}
            type="checkbox"
            value="Meat"
            id="checkbox-4"
          />
        </div>
        <div className="egg-div">
          <label htmlFor="Eggs">Eggs</label>
          <input
            onChange={() => handleTypeFilter('Eggs', checkboxFive)}
            type="checkbox"
            value="Eggs"
            id="checkbox-5"
          />
        </div>
      </div>
    </div>
  );
};
export default TypeFilter;
