import React, {useState} from 'react';
import './App.css';
import meatImage from './assets/meat.png';
import cheeseImage from './assets/cheese.png';
import baconImage from './assets/bacon.png';
import saladImage from './assets/salad.png';
import {IIngredient, IIngredientForState} from "./types";
import {nanoid} from "nanoid";


const App = () => {

  const INGREDIENTS: IIngredient[] = [
    {id: nanoid(), name: 'Meat', price: 80, image: meatImage},
    {id: nanoid(), name: 'Cheese', price: 50, image: cheeseImage},
    {id: nanoid(), name: 'Bacon', price: 60, image: baconImage},
    {id: nanoid(), name: 'Salad', price: 10, image: saladImage},
  ];

  const [ingredients, setIngredients] = useState<IIngredientForState[]>([
    {id: nanoid(), name: 'Meat', count: 0},
    {id: nanoid(), name: 'Cheese', count: 0},
    {id: nanoid(), name: 'Bacon', count: 0},
    {id: nanoid(), name: 'Salad', count: 0},
]);

const addIngredient = (ingredientName: string) => {
  setIngredients(prevState => {
    const addedIngredient = prevState.map(ingredient => {
      if (ingredient.name === ingredientName) {
        return {
          ...ingredient,
          count: ingredient.count + 1
        };
      }
      return ingredient;
    })
    return addedIngredient;
  });
};

  const deleteIngredient = (ingredientName: string) => {
    setIngredients(prevState => {
      const addedIngredient = prevState.map(ingredient => {
        if (ingredient.name === ingredientName && ingredient.count > 0) {
          return {
            ...ingredient,
            count: ingredient.count - 1
          };
        }
        return ingredient;
      })
      return addedIngredient;
    });
  };

  const getTotalPrice = () => {
    const totalPrice = ingredients.reduce((acc, ingredient) => {
      const ingredientsName = INGREDIENTS.find((index) => index.name === ingredient.name)
      if (ingredientsName) {
        const ingredientsPrice = ingredientsName.price * ingredient.count;
        return acc + ingredientsPrice;
      }
      return acc;
    }, 30)
    return totalPrice;
  };

  return (
    <div className="Container">
      <div className="Main-content">
        <div className="Ingredients-block">
          <h1 className="Ingredients-title">Ingredients</h1>
          <div className="Ingredients">
            {INGREDIENTS.map((ingredient) => {
              const ingredientCount = ingredients.find((index) => index.name === ingredient.name)?.count || 0;
              return (
                <div key={ingredient.id} className="Ingredient">
                  <img
                    className="Img"
                    src={ingredient.image}
                    alt={ingredient.name}
                    onClick={() => addIngredient(ingredient.name)}
                  />
                  <span className="Ingredient-name">
                  {ingredient.name} x{ingredientCount}
                  </span>
                  <button type="button" className="Delete-button" onClick={() => deleteIngredient(ingredient.name)}></button>
                </div>
              );
            })}
          </div>

        </div>
        <div className="Burger-block">
          <h1 className="Burger-title">Burger</h1>
          <div className="Burger">
            <div className="BreadTop">
              <div className="Seeds1"></div>
              <div className="Seeds2"></div>
            </div>
            <div className="Salad"></div>
            <div className="Cheese"></div>
            <div className="Meat"></div>
            <div className="BreadBottom"></div>
            <div className="Price">
              <span>Price: {getTotalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
};

export default App;
