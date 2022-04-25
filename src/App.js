import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.compact.css';
import './App.css';
import axios from 'axios';

import React from 'react';
import RecipeForm from './Components/recipeForm';
import RecipeDatagrid from './Components/recipeDatagrid';
import CustomToolbar from './Components/customToolbar';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  render() {
    return (
      <div className="App">
        <CustomToolbar />
        <RecipeDatagrid recipes={this.state.recipes} />
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://localhost/serviceWebFinal.Api/recipes')
      .then((response) => {
        const recipes = response.data.results;
        // On récupère les données reçues et on modifie le tableau dans l'état
        this.setState({ recipes: recipes })
      })
  }
}

export default App;
