import React from 'react';
import Form, { Item } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'devextreme-react/tag-box';
import SelectBox from 'devextreme-react/select-box';
import notify from 'devextreme/ui/notify';
import { Toolbar } from 'devextreme-react';
import axios from 'axios';

class RecipeForm extends React.Component {

    cancelButtonOptions = null;
    createButtonOptions = null;

    constructor(props) {
        super(props);

        this.state = {
            recipeData: null,
            selectedRecipeId: 0
        };

        this.createUpdateButtonOptions = {
            location: 'after',
            text: "Enregistrer",
            type: "default",
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
        this.bindNewRecipe = this.bindNewRecipe.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.createNewRecipe = this.createNewRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
    }

    componentDidMount() {
        this.clearForm()
    }

    componentDidUpdate() {
        // trigger when the selected recipe changes
        if (this.props.selectedRecipeId !== this.state.selectedRecipeId) {

            if (this.props.selectedRecipeId === 0) {
                this.clearForm()
            } else {
                this.bindNewRecipe()
            }
        }
    }

    /**
     * Clear all form fields
     */
    clearForm = () => {
        this.setState(() => {
            return {
                recipeData: {
                    ...this.state.recipeData,
                    Id: 0,
                    Name: "",
                    Type: "",
                    TimeCook: 0,
                    TimePrep: 0,
                    Ingredients: "",
                    Note: "",
                    Tags: "",
                    //Instructions: this.props.selectedRecipe.Instructions
                },
                selectedRecipeId: this.props.selectedRecipeId
            };
        });
    }

    /**
     * Change all data form to new selected recipe
     */
    bindNewRecipe = () => {
        // Set the selected recipe info and show the form
        this.setState(() => {
            return {
                recipeData: {
                    ...this.state.recipeData,
                    Id: this.props.selectedRecipeId,
                    Name: this.props.selectedRecipe.Name,
                    Type: this.props.selectedRecipe.Type,
                    TimeCook: this.props.selectedRecipe.TimeCook,
                    TimePrep: this.props.selectedRecipe.TimePrep,
                    Ingredients: this.props.selectedRecipe.Ingredients,
                    Note: this.props.selectedRecipe.Note,
                    Tags: this.props.selectedRecipe.Tags
                    //Instructions: this.props.selectedRecipe.Instructions
                },
                selectedRecipeId: this.props.selectedRecipeId
            };
        });
    }


    /**
     * submit the form and update the state
     * 
     * @param {*} e 
     */
    sendForm = (e) => {

        var bodyFormData = new FormData();

        bodyFormData.set('Id', this.state.recipeData.Id);
        bodyFormData.set('Name', this.state.recipeData.Name);
        bodyFormData.set('RecipeTypeId', 2);
        bodyFormData.set('TimeCook', this.state.recipeData.TimeCook);
        bodyFormData.set('TimePrep', this.state.recipeData.TimePrep);
        bodyFormData.set('Ingredients', this.state.recipeData.Ingredients);
        bodyFormData.set('Note', this.state.recipeData.Note);
        bodyFormData.set('Tags', this.state.recipeData.Tags);
        bodyFormData.set('Instructions', "Instructions");

        // If the recipe is new, create it
        if (this.props.selectedRecipeId === 0) {
            this.createNewRecipe(bodyFormData);
        } else {
            this.updateRecipe(bodyFormData);
        }
    }

    /**
     * Create a new recipe
     * 
     * @param {*} bodyFormData 
     */
    createNewRecipe(bodyFormData) {

        axios.post('http://localhost/serviceWebFinal.Api/recipe', bodyFormData)
            .then(res => {
                if (res.data.success === true) {

                    notify("La recette as bien été ajouté!", "success")

                    this.clearForm();
                    this.props.hidePopup();
                }
                else {
                    notify("Erreur lors de l'ajout", "error")
                }
                // Update the list of recipes
                this.props.updateRecipes();
            })
            .catch(err => {
                notify("Erreur lors de l'ajout", "error")
            });
    }

    /**
     * Update a recipe
     * 
     * @param {*} bodyFormData 
     */
    updateRecipe(bodyFormData) {
        axios.put('http://localhost/serviceWebFinal.Api/recipe', bodyFormData)
            .then(res => {
                this.props.updateRecipes();
                this.clearForm();
                this.props.hidePopup();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        return (
            <div className={this.props.showPopup ? "mb-5" : "d-none"}>

                <SelectBox dataSource={this.props.recipeType}
                    displayExpr="Name"
                    valueExpr="Id"
                    defaultValue={1} />

                <Form
                    ref={this.setForm}
                    onContentReady={this.validateForm}
                    colCount={2}
                    id="form"
                    formData={this.state.recipeData}>

                    <Item dataField="Id"
                        placeholder="Id"
                        visible={false}
                    />

                    <Item dataField="Name"
                        placeholder="Name"
                    />

                    <Item dataField="TimeCook"
                        editorType="dxNumberBox"
                        placeholder="TimeCook"
                    />

                    <Item dataField="TimePrep"
                        editorType="dxNumberBox"
                        placeholder="TimePrep"
                    />

                    <Item dataField="Ingredients"
                        editorType="dxTextBox"
                        placeholder="Ingredients"
                    />

                    <Item dataField="Instructions"
                        colSpan={2}
                        editorType="dxTextArea"
                        placeholder="Instructions"
                    />

                    <Item dataField="Note"
                        colSpan={2}
                        placeholder="Notes"
                        editorType="dxTextArea"
                    />

                    <Item dataField="Tags"
                        placeholder="Tags"
                        editorType="dxTextBox"
                    />

                </Form>
                <Toolbar>
                    <Item location="after"
                        locateInMenu="auto"
                        widget="dxButton"
                        onClick={() => this.props.hidePopup()}
                        options={this.cancelButtonOptions} />

                    <Item location="after"
                        locateInMenu="auto"
                        icon={this.props.selectedRecipeId === 0 ? 'plus' : 'edit'}
                        widget="dxButton"
                        onClick={() => this.sendForm()}
                        options={this.createUpdateButtonOptions} />
                </Toolbar>
            </div>
        )
    }
}

export default RecipeForm;