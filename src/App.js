import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './App.css';
import axios from 'axios';
import notify from 'devextreme/ui/notify';

import React from 'react';
import RecipeForm from './Components/recipeForm';
import RecipeDatagrid from './Components/recipeDatagrid';
import CustomToolbar from './Components/customToolbar';
import { confirm } from 'devextreme/ui/dialog';


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
          deleteRecipe={this.deleteRecipe}
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

        window.scrollTo(0, 0);

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

    let result = confirm("<i>Êtes-vous sûr de vouloir supprimer cette recette?</i>", "Confirmer la suppression");

    result.then((dialogResult) => {

      if (dialogResult) {

        var url = "http://localhost/serviceWebFinal.Api/recipe/" + selectedRecipeId;

        axios.delete(url, { headers: { "Access-Control-Allow-Origin": "*" }, })
          .then((response) => {
            this.updateRecipes();
            this.hideCreateRecipePopup();
            notify("La recette a bien été supprimée!", "success")
          })
      }

    });

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
