
 
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
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
      recipes: [],
      recipeData: {},
      recipePopupVisible: false,
      selectedRecipeId: 0
    };

    this.editRecipe = this.editRecipe.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
    this.showCreateRecipePopup = this.showCreateRecipePopup.bind(this);
    this.hideCreateRecipePopup = this.hideCreateRecipePopup.bind(this);
  }

  render() {
    return (
      <div className="App">

        <RecipeForm 
          showPopup={this.state.recipePopupVisible} 
          hidePopup={this.hideCreateRecipePopup} 
          selectedRecipeId={this.state.selectedRecipeId}
        />

        <CustomToolbar totalRecipes={this.state.recipes.length} showPopup={this.showCreateRecipePopup} />

        <RecipeDatagrid 
          recipes={this.state.recipes}
          editRecipe={this.editRecipe}
         />
      </div>
    );
  }

  showCreateRecipePopup() {
    this.setState({
      recipePopupVisible: true
    });
    console.log("showCreateRecipePopup");
  }

  hideCreateRecipePopup() {
    this.setState({
      recipePopupVisible: false
    });
    console.log("hideCreateRecipePopup");
  }
  
  createRecipe() {
    this.setState({
      recipePopupVisible: true,
      selectedRecipeId: 0
    });
  }

  editRecipe(recipeId) {
    this.setState({
      recipePopupVisible: true,
      selectedRecipeId: recipeId
    });
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
