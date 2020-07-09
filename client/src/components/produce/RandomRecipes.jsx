import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './RandomRecipes.css';

const RandomRecipes = (props) => {
  const [recipeOne, setRecipeOne] = useState([]);
  const [recipeTwo, setRecipeTwo] = useState([]);

  console.log(props);

  const getFirstRecipe = useCallback(async () => {
    await axios.get(`/recipe/${props.searchTerm}`).then((response) => {
      console.log(response);
      setRecipeOne(
        response.data[Math.floor(Math.random() * response.data.length)]
      );
    });
  }, [props.searchTerm]);

  const getSecondRecipe = useCallback(async () => {
    await axios.get(`/recipe/${props.searchTerm}`).then((response) => {
      setRecipeTwo(
        response.data[Math.floor(Math.random() * response.data.length)]
      );
    });
  },[props.searchTerm]);

  useEffect(() => {
    props.searchTerm && getFirstRecipe();
    props.searchTerm && getSecondRecipe();
  }, [props.searchTerm, getFirstRecipe, getSecondRecipe]);

  return (
    <div className="recipe-block">
      <div className="recipe">
        <img src={recipeOne && recipeOne.image} alt="recipe"/>
        <a href={recipeOne && recipeOne.sourceUrl} target="_blank" rel="noopener noreferrer">
          {recipeOne && recipeOne.title}
        </a>
      </div>
      <div className="recipe">
        <img src={recipeTwo && recipeTwo.image} alt="recipe"/>
        <a href={recipeTwo && recipeTwo.sourceUrl} target="_blank" rel="noopener noreferrer">
          {recipeTwo && recipeTwo.title}
        </a>
      </div>
    </div>
  );
};

export default RandomRecipes;
