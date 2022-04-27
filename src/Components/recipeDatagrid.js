import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Pager,
  Toolbar,
  Scrolling,
  Selection,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';


const columns = ['Id', 'Name', 'TimeCook', 'TimePrep', 'Instructions', 'Note', 'Tags'];
const allowedPageSizes = [5, 10, 'all'];
const notesEditorOptions = { height: 100 };

class RecipeDatagrid extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedItemKeys: []
    };

    this.deleteRecords = this.deleteRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
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
          defaultColumns={columns}
          showBorders={true}
          onSelectionChanged={this.onSelectionChanged}
          hoverStateEnabled={true}
          keyExpr="Id"
        >
          <Scrolling rowRenderingMode='virtual'></Scrolling>
          <Paging defaultPageSize={8} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            showPageSizeSelector={true}
            showNavigationButtons={true} />
          <Selection mode="multiple" />
          <Column dataField="Id" caption="Id" width={70} />
          <Column dataField="Name" caption="Name" width={200} />
          <Column dataField="TimeCook" caption="TimeCook" width={100} />
          <Column dataField="TimePrep" caption="TimePrep" width={100} />
          <Column dataField="Instructions" caption="Instructions" width={300} />
          <Column dataField="Note" caption="Note" width={100} />
          <Column dataField="Tags" caption="Tags" width={100} />
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