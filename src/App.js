import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Nutritions } from "./Nutritions";
import image from "./salmon.png";
import { LoaderPage } from "./LoaderPage";



function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [Nutrition, setNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = '9e2937fb';
  const APP_KEY = '3e3190e88a120cdd9b170e752eae1fe7';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setNutrition(data);
    } else {
      setStateLoader(false);
      alert('You have entered the incorrect ingredients ');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div className="App">

<div className="container">
      {stateLoader && <LoaderPage />}
      <img src={image} alt="salmon"/>
      <h1>Nutrition Analysis</h1>
      </div>
      <div className="container">
      <form onSubmit={finalSearch}>
        <input className="search"
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button className="button-38" type="submit">Search</button>
      </form>
      </div>
     
      <div className="container list">
        {
          Nutrition && <p><b>{Nutrition.calories} kcal</b></p>
        }
        {
          Nutrition && Object.values(Nutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <Nutritions
              
                label={label}
                quantity={quantity}
                unit={unit}
              />
              
            )
        }
       
      </div>
    </div>
    
  );
}

export default App;
