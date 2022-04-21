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
import { Item } from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];
const allowedPageSizes = [5, 10, 'all'];
const notesEditorOptions = { height: 100 };

const dataSource = new DataSource({
  store: new ArrayStore({
    //data: employees,
    key: 'ID',
    
  }),
});

class RecipeDatagrid extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            selectedItemKeys: [],
          };

          this.selectionChanged = this.selectionChanged.bind(this);
          this.deleteRecords = this.deleteRecords.bind(this);
          this.addRecord = this.addRecord.bind(this);
    }

    render() {
        return (
            <div>
        <DataGrid
          dataSource="sampleData.json"
          defaultColumns={columns}
          showBorders={true}
          selectedRowKeys={this.state.selectedItemKeys}
          onSelectionChanged={this.selectionChanged}
        >
          <Scrolling rowRenderingMode='virtual'></Scrolling>
          <Paging defaultPageSize={5} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            showPageSizeSelector={true}
            showNavigationButtons={true} />
          <Selection mode="multiple" />
          <Column dataField="Prefix" caption="Title" width={70} />
          <Column dataField="FirstName" />
          <Column dataField="LastName" />
          <Column dataField="BirthDate" dataType="date" />
          <Column dataField="Position" width={170} />
          <Column dataField="HireDate" dataType="date" />
          <Column dataField="Address" visible={false} />
          <Column dataField="Notes" visible={false} />
          <Toolbar>
            <Item location="after">
              <Button
                onClick={this.deleteRecords}
                icon="trash"
                text="Supprimer les recettes sélectionnées" />
            </Item>
            <Item location="after">
              <Button
                onClick={this.addRecord}
                icon="add"
                text="Ajouter une recette"
               />
            </Item>
          </Toolbar>
        </DataGrid>  
      </div>
        );
    }

    deleteRecords() {
        this.state.selectedItemKeys.forEach((key) => {
          dataSource.store().remove(key);
        });
        this.setState({
          selectedItemKeys: [],
        });
        dataSource.reload();
      }
      
      addRecord() {
        this.state.selectedItemKeys.forEach((key) => {
          dataSource.store().remove(key);
        });
        this.setState({
          selectedItemKeys: [],
        });
        dataSource.reload();
      }
      
       selectionChanged(data) {
        console.log(this.state.selectedItemKeys.length)
        this.setState({
          selectedItemKeys: data.selectedRowKeys,
        });
      }
}

export default RecipeDatagrid;