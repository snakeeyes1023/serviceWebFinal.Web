import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.light.css';
import './App.css';


import React from 'react';
import RecipeForm from './Components/recipeForm';
import RecipeDatagrid from './Components/recipeDatagrid';


class App extends React.Component {

  constructor(props) {
    super(props);
  }

render() {
  return (
    <div className="App">
      <h1>Mes recettes</h1>
        <RecipeForm />
        <RecipeDatagrid />      
    </div>
  );
}

}

export default App;
