import React, {useEffect, useState} from "react"; 
import Recipe from "./Recipe";
import "./App.css";


const App = () => {
    const APP_ID = "b9b89245";
    const APP_KEY = "5e34dfbe49bd648d4df1adffc6601380";

    //These are state
    //Everything stored in recipes
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('banana');

    useEffect(() => {
        getRecipes();
    }, [query]); /*If bracket is empty then by default it will run only once*/
    
    const getRecipes = async () => { //Adding async
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
        const data = await response.json(); /*Any external requests must have await or use promises */
        setRecipes(data.hits); 
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value); //Value of the input
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }
    return (
        <div className = "App">
            <form onSubmit={getSearch} className="search-form">
                <input 
                    className="search-bar" 
                    type="text" value={search} 
                    onChange={updateSearch} />
                <button className = "search-button" type="submit">
                    Touch
                </button>
            </form>
            <div className="recipes">
            {recipes.map(recipe =>( //Using parantehesis will allow us to return jsx/html elements
                <Recipe 
                    key={recipe.recipe.label}
                    title={recipe.recipe.label} 
                    calories={recipe.recipe.calories} 
                    image={recipe.recipe.image} 
                    ingredients={recipe.recipe.ingredients}
                />
            ))} 
            </div>
        </div>
    );
};

export default App;