import React from 'react';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Scrolling,
  FilterRow,
  GroupPanel,
  Selection,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';


const allowedPageSizes = [5, 10, 'all'];

class RecipeDatagrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItemKeys: []
    };

    this.editRecipe = this.editRecipe.bind(this);
    this.cellRender = this.cellRender.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  editRecipe(recipeId) {
    this.props.editRecipe(recipeId)
  }

  render() {
    return (
      <div>
        <DataGrid
          dataSource={this.props.recipes}
          showBorders={true}
          onSelectionChanged={this.onSelectionChanged}
          hoverStateEnabled={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          keyExpr="Id"
          >
          <FilterRow visible={true} />
          <GroupPanel visible={true} />
          <Scrolling rowRenderingMode='virtual'></Scrolling>
          <Paging defaultPageSize={8} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            showPageSizeSelector={true}
            showNavigationButtons={true} />
          <Selection mode="single" />

          <Column dataField="Id" caption="Identifiant"  />
          <Column dataField="Name" caption="Nom" />
          <Column dataField="TimeCook" caption="Temps cuisson" />
          <Column dataField="TimePrep" caption="Temps préparation"  />
          <Column dataField="TypeName" caption="Type de recette" groupIndex={0} />

        </DataGrid>
      </div>
    );
  }

 cellRender(data) {
    return <Button
        text="Edit"
        type= "normal"
        stylingMode= "contained"
        icon="edit"
        onClick={() => this.editRecipe(data.value)}
      />
  }
  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];
    this.editRecipe(data.Id);   
  }
}

export default RecipeDatagrid;