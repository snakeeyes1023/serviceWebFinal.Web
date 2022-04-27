import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';

const addButtonOptions = {
    icon: 'plus',
    location: 'after',
    text: "Ajouter une recette",
    type: "default",
    stylingMode: "contained"
};


const deleteButtonOptions = {
    icon: 'trash',
    location: 'after',
    text: "Suprimer les recettes sélectionnées",
    type: "normal",
    stylingMode: "contained"
};

class CustomToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.renderLabel = this.renderLabel.bind(this);
    }
    
    renderLabel() {
        return <div className="toolbar-label"><b>Mes recettes | totals : {this.props.totalRecipes}</b> </div>;
    }
    render() {
        return (
            <Toolbar>
                <Item location="before"
                    locateInMenu="never"
                    render={this.renderLabel} />

                <Item location="after"
                    locateInMenu="auto"
                    widget="dxButton"
                    onClick={() => this.props.deleteRecipe()}
                    options={deleteButtonOptions} />

                <Item location="after"
                    locateInMenu="auto"
                    onClick={() => this.props.showPopup()}
                    widget="dxButton"
                    options={addButtonOptions} />
            </Toolbar>
        );
    }
}

export default CustomToolbar;