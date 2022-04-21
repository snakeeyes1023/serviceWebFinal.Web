import React from 'react';
import Form, { Item } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'devextreme-react/tag-box';
import { Button } from 'devextreme-react/button';

const simpleProducts = [
    'HD Video Player',
    'SuperHD Video Player',
    'SuperPlasma 50',
    'SuperLED 50',
    'SuperLED 42',
    'SuperLCD 55',
    'SuperLCD 42',
    'SuperPlasma 65',
    'SuperLCD 70',
    'Projector Plus',
    'Projector PlusHT',
    'ExcelRemote IR',
    'ExcelRemote Bluetooth',
    'ExcelRemote IP',
  ];

var recipeData = {
    name: 'Carrée',
    type: 'Datte',
    timeCook: 20,
    timePrep: 10,
    ingredients: [
        {
            name: 'Farine',
            quantity: '1 kg'
        },
        {
            name: 'Oeuf',
            quantity: '2'
        },
        {
            name: 'Lait',
            quantity: '1/2'
        }
    ],
    instructions: [
        'Mélanger la farine et le lait',
        'Ajouter les oeufs',
        'Mélanger',
        'Ajouter la levure',
        'Mélanger',
        'Ajouter le sucre',
    ],
    notes: 'C\'est une recette de carrée',
    tags: "carrée, datte, dessert, cuisson, cuisson rapide, facile"
};

class RecipeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemKeys: [],
            readOnly: false,
            showColon: true,
            minColWidth: 300,
            colCount: 2,
            recipeData: recipeData,
        };
        this.nameEditorOptions = { placeholder: 'Nom de la recette' };
        this.typeEditorOptions = {
            dataSource: [
                { text: 'Dessert', value: 'Dessert' }
            ],
            placeholder: 'Type de recette'
        };
        this.timeCookEditorOptions = {
            placeholder: 'Temps de cuisson',
            min: 0,
            max: 120,
            step: 5
        };
        this.timePrepEditorOptions = {
            placeholder: 'Temps de préparation',
            min: 0,
            max: 120,
            step: 5
        };
        this.ingredientsEditorOptions = {
            dataSource: [
                { text: 'Farine', value: 'Farine' }
            ],
            placeholder: 'Ingrédients',
            acceptCustomValue: true,
            valueExpr: 'value',
            displayExpr: 'text',
            searchEnabled: true,
            searchTimeout: 500,
            minSearchLength: 0,
            maxSelectedItems: 5,
            onCustomItemCreating: this.onCustomItemCreating
        };
        
        this.instructionsEditorOptions = {
            dataSource: [
                { text: 'Mélanger', value: 'Mélanger' }
            ],
            placeholder: 'Instructions',
            acceptCustomValue: true,
            valueExpr: 'value',
            displayExpr: 'text',
            searchEnabled: true,
            searchTimeout: 500,
            minSearchLength: 0,
            maxSelectedItems: 5,
            onCustomItemCreating: this.onCustomItemCreating
        };

          
        this.notesEditorOptions = {
            placeholder: 'Notes'
        };
        this.tagsEditorOptions = {
            acceptCustomValue: true,
            valueExpr: 'value',
        }
    }

    render() {
        const {
            recipeData,
        } = this.state;

        return (
            <div>
                <div>
                    <Form
                        onContentReady={this.validateForm}
                        colCount={2}
                        id="form"
                        formData={recipeData}>
                        <Item dataField="Name" editorOptions={this.nameEditorOptions} />
                        <Item dataField="Type" editorType="dxSelectBox" editorOptions={this.typeEditorOptions} />
                        <Item dataField="TimeCook" editorType="dxNumberBox" editorOptions={this.timeCookEditorOptions} />
                        <Item dataField="TimePrep" editorType="dxNumberBox" editorOptions={this.timePrepEditorOptions} />
                        <Item dataField="Ingredients" editorType="dxTagBox" editorOptions={this.tagsEditorOptions}  />
                        <Item dataField="Instructions" colSpan={2} editorType="dxTagBox" editorOptions={this.tagsEditorOptions} />
                        <Item dataField="Notes"  colSpan={2} editorType="dxTextArea" editorOptions={this.notesEditorOptions} />
                        <Item dataField="Tags" editorType="dxTagBox" editorOptions={this.tagsEditorOptions} />
                    </Form>
                </div>
                <div>
                    <Button
                        width={120}
                        text="Annuler"
                        type="normal"
                        stylingMode="contained"
                        onClick={this.onClick}
                    />
                    <Button
                        width={120}
                        text="Créer"
                        type="default"
                        stylingMode="contained"
                        onClick={this.onClick}
                    />
                </div>
            </div>
        );
    }
}

export default RecipeForm;