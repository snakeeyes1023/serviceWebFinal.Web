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
      recipePopupVisible: false,
      selectedRecipeId: 0,
    });
  }

  /**
  * Edit a recipe
  * 
  * @param {*} recipeId 
  */
  editRecipe(recipeId) {
    var url = process.env.REACT_APP_API_URL + "/recipes?id=" + recipeId;

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

    var apiKey = prompt("Entrer votre Clée Api", "cd3d856e-ea00-4136-8e05-8c8decb31166");

    let result = confirm("<i>Êtes-vous sûr de vouloir supprimer cette recette?</i>", "Confirmer la suppression");

    result.then((dialogResult) => {

      if (dialogResult) {

        var url = process.env.REACT_APP_API_URL + "/recipe/" + selectedRecipeId;

        axios.delete(url, {
          headers: {
            'Authorization': apiKey,
            "Access-Control-Allow-Origin": "*"
          }
        })
          .then((response) => {
            this.updateRecipes();
            this.hideCreateRecipePopup();
            notify("La recette a bien été supprimée!", "success")
          })
          .catch((error) => {
            //get status code
            var statusCode = error.response.status;

            if (statusCode === 401) {
              notify("Vous n'avez pas les droits pour supprimer cette recette", "error");
            }
            else{
              notify("Une erreur est survenue lors de la suppression de la recette!", "error")
            }
          });
      }
    });

  }


  /**
   * Get the list of recipe types
   */
  getTypes() {
    axios.get( process.env.REACT_APP_API_URL + '/recipe-type')
      .then((response) => {
        //select only the name of the type
        this.setState({ recipeType: response.data.results })
      })
  }

  /**
   * Select all the recipes
   */
  updateRecipes() {
    axios.get(process.env.REACT_APP_API_URL + '/recipes')
      .then((response) => {
        const recipes = response.data.results;
        //order the recipes by id
        recipes.sort(function (a, b) {
          return a.id - b.id;
        });
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
