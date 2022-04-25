import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import notify from 'devextreme/ui/notify';

const addButtonOptions = {
    icon: 'plus',
    location: 'after',
    text: "Ajouter une recette",
    type: "default",
    stylingMode: "contained",
    onClick: () => {
        notify('Add button has been clicked!');
    },
};

function renderLabel() {
    return <div className="toolbar-label"><b>Mes recettes | totals : 1</b> </div>;
}

const deleteButtonOptions = {
    icon: 'trash',
    location: 'after',
    text: "Suprimer les recettes sélectionnées",
    type: "normal",
    stylingMode: "contained",
    onClick: () => {
        notify('delete button has been clicked!');
    },
};

class CustomToolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <Item location="before"
                    locateInMenu="never"
                    render={renderLabel} />

                <Item location="after"
                    locateInMenu="auto"
                    widget="dxButton"
                    options={deleteButtonOptions} />

                <Item location="after"
                    locateInMenu="auto"
                    widget="dxButton"
                    options={addButtonOptions} />
            </Toolbar>
        );
    }
}

export default CustomToolbar;