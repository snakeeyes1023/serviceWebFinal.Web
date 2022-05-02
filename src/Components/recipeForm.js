import React from 'react';
import Form, { Item, RequiredRule, SimpleItem } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'devextreme-react/tag-box';
import SelectBox from 'devextreme-react/select-box';
import notify from 'devextreme/ui/notify';
import { Toolbar } from 'devextreme-react';
import axios from 'axios';
import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import { LoadPanel } from 'devextreme-react/load-panel';


const position = { of: '#form-recipe' };

const deleteButtonOptions = {
    icon: 'trash',
    location: 'after',
    text: "Suprimer la recette",
    type: "normal",
    stylingMode: "contained"
};

class RecipeForm extends React.Component {

    cancelButtonOptions = null;
    createButtonOptions = null;

    constructor(props) {
        super(props);

        this.state = {
            recipeData: {},
            selectedRecipeId: 0,
            pendingRecipe: null,
            searchRecipeUrl: "",
            loadPanelVisible: false,
            showIndicator: true,
            shading: true,
            showPane: true,
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

        this.fillFormButtonOptions = {
            icon: 'refresh',
            location: 'after',
            text: "Remplir le formulaire",
            type: "normal",
            stylingMode: "contained",
            onClick: () => {
                this.searchRecipe();
            },
        };

        this.setForm = (ref) => {
            this.form = ref.instance;
        };

        this.onRecipeTypeChanged = this.onRecipeTypeChanged.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.bindNewRecipe = this.bindNewRecipe.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.onUrlValueChanged = this.onUrlValueChanged.bind(this);
        this.createNewRecipe = this.createNewRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.searchRecipe = this.searchRecipe.bind(this);


        //LOAD INDICATOR
        this.hideLoadPanel = this.hideLoadPanel.bind(this);
        this.onShowIndicatorChange = this.onShowIndicatorChange.bind(this);
        this.onShadingChange = this.onShadingChange.bind(this);
        this.onShowPaneChange = this.onShowPaneChange.bind(this);
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

    onRecipeTypeChanged(e) {
        this.setState(() => {
            return {
                recipeData: {
                    ...this.state.recipeData,
                    Type: e
                }
            }
        });
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
                    Type: 0,
                    TimeCook: 0,
                    TimePrep: 0,
                    Ingredients: "",
                    Instructions: "<ol><li></li></ol>",
                    Note: "",
                    Tags: ""
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
                    Tags: this.props.selectedRecipe.Tags,
                    Instructions: this.props.selectedRecipe.Instructions
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

        var validationResult = this.form.validate();
        if (validationResult.isValid) {

            if(this.state.recipeData.Type === 0) {
                notify("Le type de recette est requis", "error");
                return;
            }
            var bodyFormData = new FormData();

            bodyFormData.set('Id', this.state.recipeData.Id);
            bodyFormData.set('Name', this.state.recipeData.Name);
            bodyFormData.set('RecipeTypeId', this.state.recipeData.Type);
            bodyFormData.set('TimeCook', this.state.recipeData.TimeCook);
            bodyFormData.set('TimePrep', this.state.recipeData.TimePrep);
            bodyFormData.set('Ingredients', this.state.recipeData.Ingredients);
            bodyFormData.set('Note', this.state.recipeData.Note);
            bodyFormData.set('Tags', this.state.recipeData.Tags);
            bodyFormData.set('Instructions', this.state.recipeData.Instructions);
    
            // If the recipe is new, create it
            if (this.props.selectedRecipeId === 0) {
                this.createNewRecipe(bodyFormData);
            } else {
                this.updateRecipe(bodyFormData);
            }
        }
        else{
            notify("Veuillez remplir tous les champs", "error");
        }
    }

    /**
     * Search a recipe online
     */
    onUrlValueChanged = (e) => {
        this.setState({
            searchRecipeUrl: e.value
        });
    }

    /**
     * Search recipe on Spoonacular API
     *
     */
    searchRecipe() {

        this.clearForm();

        this.setState({
            loadPanelVisible: true,
        });

        axios.get("https://api.spoonacular.com/recipes/extract?apiKey=3e3c02a991df4d118d00de717ca84cc0&url=" + this.state.searchRecipeUrl)
            .then(res => {
                console.log(res.data);
                const findRecipe = res.data;

                this.hideLoadPanel();

                notify("La recette as bien été trouvée!", "success")

                this.setState(() => {
                    return {
                        recipeData: {
                            ...this.state.recipeData,
                            Id: 0,
                            Name: findRecipe.title,
                            Type: findRecipe.cuisine,
                            TimeCook: findRecipe.readyInMinutes,
                            TimePrep: findRecipe.cookingMinutes,
                            Ingredients: findRecipe.extendedIngredients.map(i => i.original).join(", "),
                            Note: "",
                            Tags: "",
                            Instructions: findRecipe.instructions
                        }
                    };
                });
            }
            )
            .catch(err => {
                console.log(err);
                notify("Erreur impossible de trouver la recette", "error")
                this.hideLoadPanel();

            }
            );
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

        let errorMessage = "Erreur lors de la modification";

        axios.post('http://localhost/serviceWebFinal.Api/recipe/' + this.props.selectedRecipeId, bodyFormData)
            .then(res => {
                if (res.data.success === true) {

                    notify("La recette as bien été modifié.", "success")

                    this.clearForm();
                    this.props.updateRecipes();
                    this.props.hidePopup();
                }
                else {
                    notify(errorMessage, "error")
                }
            })
            .catch(err => {
                notify(errorMessage, "error")
            });
    }

    hideLoadPanel() {
        this.setState({
            loadPanelVisible: false
        });
    }

    onShowIndicatorChange(e) {
        this.setState({
            showIndicator: e.value,
        });
    }

    onShadingChange(e) {
        this.setState({
            shading: e.value,
        });
    }

    onShowPaneChange(e) {
        this.setState({
            showPane: e.value,
        });
    }

    renderLabel() {
        return <div className="toolbar-label"><b>Gestion de recette</b> </div>;
    }

    render() {

        return (
            <div className={this.props.showPopup ? "mb-5 card-bg" : "d-none"}>

                <Toolbar id='toolBarActionHead'>
                    <Item location="before"
                        locateInMenu="never"
                        render={this.renderLabel} />

                    <Item location="after"
                        visible={this.props.selectedRecipeId !== 0}
                        locateInMenu="auto"
                        widget="dxButton"
                        onClick={() => this.props.deleteRecipe()}
                        options={deleteButtonOptions} />
                </Toolbar>

                <div className={this.props.selectedRecipeId !== 0 ? "d-none" : ""} >
                    <h2>Remplissage automatique</h2>

                    <TextBox
                        placeholder="Entrer l'url d'une recette pour la rechercher"
                        value={this.state.searchRecipeUrl}
                        onValueChanged={this.onUrlValueChanged}
                        stylingMode="filled">
                        <TextBoxButton
                            name="search"
                            location="after"
                            options={this.fillFormButtonOptions}
                        />
                    </TextBox>
                </div>
                <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    position={position}
                    onHiding={this.hideLoadPanel}
                    visible={this.state.loadPanelVisible}
                    showIndicator={this.state.showIndicator}
                    shading={this.state.shading}
                    showPane={this.state.showPane}
                />

                <div id='form-recipe'>
                    <div>
                        <h2>Formulaire</h2>
                    </div>
                    <SelectBox dataSource={this.props.recipeType}
                        displayExpr="Name"
                        valueExpr="Id"
                        value={this.state.recipeData.Type}
                        ValidationGroup="recipeData"
                        onValueChange={this.onRecipeTypeChanged}
                        />

                    <Form
                        ref={this.setForm}
                        validationGroup="recipeData"
                        showValidationSummary={true}
                        colCount={2}
                        id="dxFormContainer"
                        formData={this.state.recipeData}>

                        <Item dataField="Id"
                            placeholder="Id"
                            visible={false}
                        />

                        <SimpleItem dataField="Name"
                            placeholder="Name">
                            <RequiredRule message="Le nom est requis." />
                        </SimpleItem>


                        <SimpleItem dataField="TimeCook"
                            editorType="dxNumberBox"
                            placeholder="TimeCook">
                            <RequiredRule message="le temps de cuisson est requis" />
                        </SimpleItem>

                        <SimpleItem dataField="TimePrep"
                            editorType="dxNumberBox"
                            placeholder="TimePrep">
                            <RequiredRule message="Le temps de préparation est requis" />
                        </SimpleItem>

                        <SimpleItem dataField="Ingredients"
                            editorType="dxTextBox"
                            placeholder="Ingredients">
                            <RequiredRule message="Les ingredients sont requis" />
                        </SimpleItem>

                        <SimpleItem dataField="Instructions"
                            colSpan={2}
                            editorType="dxHtmlEditor"
                            placeholder="Instructions">
                            <RequiredRule message="Les instructions sont requise." />
                        </SimpleItem>

                        <SimpleItem dataField="Note"
                            colSpan={2}
                            placeholder="Notes"
                            editorType="dxTextArea">
                        </SimpleItem>

                        <SimpleItem dataField="Tags"
                            placeholder="Tags"
                            editorType="dxTextBox">
                        </SimpleItem>

                    </Form>
                </div>

                <Toolbar id='toolBarAction'>
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