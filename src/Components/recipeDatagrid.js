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

const columns = ['Id', 'Name', 'TimeCook', 'TimePrep', 'Instructions', 'Note', 'Tags'];
const allowedPageSizes = [5, 10, 'all'];
const notesEditorOptions = { height: 100 };

class RecipeDatagrid extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedItemKeys: []
    };

    this.selectionChanged = this.selectionChanged.bind(this);
    this.deleteRecords = this.deleteRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
  }

  render() {
    return (
      <div>
        <DataGrid
          dataSource={this.props.recipes}
          defaultColumns={columns}
          showBorders={true}
          selectedRowKeys={this.state.selectedItemKeys}
          onSelectionChanged={this.selectionChanged}
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

  deleteRecords() {
    /**
    this.state.selectedItemKeys.forEach((key) => {
      dataSource.store().remove(key);
    });
    this.setState({
      selectedItemKeys: [],
    });
    dataSource.reload();
    */
  }

  addRecord() {
    /**
    this.state.selectedItemKeys.forEach((key) => {
      dataSource.store().remove(key);
    });
    this.setState({
      selectedItemKeys: [],
    });
    dataSource.reload();
    */
  }

  selectionChanged(data) {
    console.log(this.state.selectedItemKeys.length)
    this.setState({
      selectedItemKeys: data.selectedRowKeys,
    });
  }
}

export default RecipeDatagrid;