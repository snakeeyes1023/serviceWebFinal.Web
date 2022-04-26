import React from 'react';
import Form, { Item } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'devextreme-react/tag-box';
import { Toolbar } from 'devextreme-react';

class RecipeForm extends React.Component {

    cancelButtonOptions = null;
    createButtonOptions = null;

    constructor(props) {
        super(props);


        this.state = {
            selectedItemKeys: [],
            readOnly: false,
            showColon: true,
            minColWidth: 300,
            colCount: 2,
            positionOf: '',
            recipeData: {}
        };

        this.nameEditorOptions = {
            placeholder: 'Nom de la recette'
        };

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
            placeholder: 'Notes'
        };

        this.instructionsEditorOptions = {
            placeholder: 'Notes'
        };

        this.notesEditorOptions = {
            placeholder: 'Notes'
        };
        this.tagsEditorOptions = {
            acceptCustomValue: true,
            valueExpr: 'value',
        }

        this.createUpdateButtonOptions = {
            location: 'after',
            text: "Enregistrer",
            type: "success",
            stylingMode: "contained"
        };

        this.cancelButtonOptions = {
            icon: 'close',
            location: 'after',
            text: "Annuler",
            type: "normal",
            stylingMode: "contained"
        };
        this.setForm = (ref) => {
            this.form = ref.instance;
        };

        this.sendForm = this.sendForm.bind(this);
    }

    //submit the form and update the state
    sendForm = (e) => {
        console.log(this.props.recipeData);
        alert(JSON.stringify(this.form.option("formData")));
    }

    render() {

        return (
            <div className={this.props.showPopup ? "mb-5" : "d-none"}>
                <Form
                    ref={this.setForm}
                    onContentReady={this.validateForm}
                    colCount={2}
                    id="form"
                    formData={this.state.recipeData}>
                    <Item dataField="Id" editorOptions={this.nameEditorOptions} />
                    <Item dataField="Name" editorOptions={this.nameEditorOptions} />
                    <Item dataField="Type" editorType="dxSelectBox" editorOptions={this.typeEditorOptions} />
                    <Item dataField="TimeCook" editorType="dxNumberBox" editorOptions={this.timeCookEditorOptions} />
                    <Item dataField="TimePrep" editorType="dxNumberBox" editorOptions={this.timePrepEditorOptions} />
                    <Item dataField="Ingredients" editorType="dxTagBox" editorOptions={this.tagsEditorOptions} />
                    <Item dataField="Instructions" colSpan={2} editorType="dxTagBox" editorOptions={this.tagsEditorOptions} />
                    <Item dataField="Notes" colSpan={2} editorType="dxTextArea" editorOptions={this.notesEditorOptions} />
                    <Item dataField="Tags" editorType="dxTagBox" editorOptions={this.tagsEditorOptions} />
                </Form>
                <Toolbar>
                    <Item location="after"
                        locateInMenu="auto"
                        widget="dxButton"
                        onClick={() => this.props.hidePopup()}
                        options={this.cancelButtonOptions} />

                    <Item location="after"
                        locateInMenu="auto"
                        icon= {this.props.selectedRecipeId === 0 ? 'plus' : 'edit'}
                        widget="dxButton"
                        onClick={() => this.sendForm()}
                        options={this.createUpdateButtonOptions} />
                </Toolbar>
            </div>
        )
    }
}

export default RecipeForm;