

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
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
      recipeToEdit: {},
      recipePopupVisible: false,
      selectedRecipeId: 0,
      recipeType: []
    };

    this.editRecipe = this.editRecipe.bind(this);
    this.showCreateRecipePopup = this.showCreateRecipePopup.bind(this);
    this.hideCreateRecipePopup = this.hideCreateRecipePopup.bind(this);
    this.updateRecipes = this.updateRecipes.bind(this);
    this.getTypes = this.getTypes.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  render() {
    return (
      <div className="App">

        <RecipeForm
          showPopup={this.state.recipePopupVisible}
          hidePopup={this.hideCreateRecipePopup}
          updateRecipes={this.updateRecipes}
          selectedRecipeId={this.state.selectedRecipeId}
          selectedRecipe={this.state.recipeToEdit}
          recipeType={this.state.recipeType}
        />

        <CustomToolbar 
          totalRecipes={this.state.recipes.length} 
          showPopup={this.showCreateRecipePopup} 
          deleteRecipe={this.deleteRecipe}
        />

        <RecipeDatagrid
          recipes={this.state.recipes}
          editRecipe={this.editRecipe}
        />
      </div>
    );
  }

  /**
   * Show the popup to create a new recipe or edit
   */
  showCreateRecipePopup() {
    this.setState({
      recipePopupVisible: true,
      selectedRecipeId: 0,
      selectedRecipe: {}
    });
  }


  /**
   * Hide the popup to create a new recipe or edit
   */
  hideCreateRecipePopup() {
    this.setState({
      recipePopupVisible: false
    });
  }

  /**
  * Edit a recipe
  * 
  * @param {*} recipeId 
  */
  editRecipe(recipeId) {
    var url = "http://localhost/serviceWebFinal.Api/recipes?id=" + recipeId;

    axios.get(url)
      .then((response) => {

        const recipe = response.data;

        this.setState({
          recipeToEdit: recipe,
          recipePopupVisible: true,
          selectedRecipeId: recipeId
        });
      })
  }

  /**
   * Delete a recipe
   * 
   */
  deleteRecipe() {
    //get selected recipe
    var selectedRecipeId = this.state.selectedRecipeId;
    var url = "http://localhost/serviceWebFinal.Api/recipe?id=" + selectedRecipeId;

    axios.delete(url)
      .then((response) => {
        this.updateRecipes();
      })
  }
      

  /**
   * Get the list of recipe types
   */
  getTypes() {
    axios.get('http://localhost/serviceWebFinal.Api/recipe-type')
      .then((response) => {
        //select only the name of the type
        this.setState({ recipeType: response.data.results })
      })
  }

  /**
   * Select all the recipes
   */
  updateRecipes() {
    axios.get('http://localhost/serviceWebFinal.Api/recipes')
      .then((response) => {
        const recipes = response.data.results;
        // On récupère les données reçues et on modifie le tableau dans l'état
        this.setState({ recipes: recipes })
      })
  }

  componentDidMount() {
    this.updateRecipes();
    this.getTypes();
  }
}

export default App;
