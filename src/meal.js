// const mealList = document.getElementById("meal-list")
// const mealForm = document.querySelector("#meal-form")
// const nameInput = document.getElementById("meal-name")
// const thumbInput = document.getElementById("meal-thumb")
// const ingredientsInput = document.getElementById("meal-ingredients")
// const instructionInput = document.getElementById("meal-instruction")

// the major responsibilities for this class - 
// (1) build out an Meal class
// (2) remembering all the meals
// (3) setting the properties of each meal
// (4) the html we want to put on the DOM for each meal
// (5) attch event listeners particular to each meal

class Meal{

    static all = []
    static mealList = document.getElementById("meal-list")

    // similar to initialize method in Ruby
    // invoke new method to trigger constructor to run in the console
    constructor({id, name, thumb, ingredients, instruction, category_id}) {
       // setting the properties of each meal
       this.id = id
       this.name = name
       this.thumb = thumb
       this.ingredients = ingredients
       this.instruction = instruction
       this.category_id = category_id

       // remembering all the meal objects
       // this respresents the current meal object
       Meal.all.push(this)  

       // setup the HTML element that will contain the meal
       this.element = document.createElement("div")  // mealDiv
       this.element.dataset["id"] = id
       this.element.id = `meal-div-${id}`

       this.element.addEventListener("click", this.handleMealDivClick)
    }

    // this is an arrow function b/c it is used as a callback in an event listener 
    handleMealDivClick = (e) => {
        if(e.target.innerText === "Edit") {
           // change the button to display "save"
            e.target.innerText = "Save"
            // replace the div with different input tags
            createEditFields(e.target)
        } else if (e.target.innerText === "Delete") {
            deleteMeal(e)
        } else if (e.target.innerText === "Save") {
            e.target.innerText = "Edit"
            // also save this update info to the DB
            // turn all input fields back into the previous
            saveUpdatedMeal(e.target)
        }
     }


    render() {
       this.element.innerHTML = `
         <div data-id="${this['id']}" class="meal-div text-left rounded">
           <img src="${this['thumb']}" alt="${this["name"]}" class="thumb rounded float-right">
           <h4 class="name">${this["name"]}</h4>
           <b>Ingredients:</b><p class="ingredients"> ${this["ingredients"]}</p>
           <b>Instruction:</b><p class="instruction"> ${this["instruction"]}</p>
         
           <button data-id="${this['id']}" class="edit btn-sm btn-info">Edit</button>
           <button data-id="${this['id']}" class="delete btn-sm btn-info">Delete</button>
         </div>
         <br>
      `
        return this.element
    }


    // single responsibility which will take the RENDERED this.element in and attach it to the DOM
    attachToDom() {
        this.render()
        Meal.mealList.append(this.element)
        // Meal.mealList.append(this.render())
    }

}

//function renderMeal(meal) {
//    const mealDiv = document.createElement("div")
//    mealDiv.dataset["id"] = meal['id']
//    mealDiv.id = `meal-div-${meal['id']}`
//    renderMealDivHTML(mealDiv, meal)
//    mealList.append(mealDiv)
//    const mealDeleteBtn = mealDiv.querySelector(".delete")
//    mealDiv.addEventListener("click", handleMealDivClick)
//}


function saveUpdatedMeal(saveBtn){
    const div = saveBtn.parentElement
    const id = div.dataset.id
    const nameInput = div.querySelector(".edit-name")
    const ingredientsInput = div.querySelector(".edit-ingredients")
    const instructionInput = div.querySelector(".edit-instruction")

    // get ready to send a patch request
    // configure the object
    //make our params hash
   
    const mealInfo = {
        name: nameInput.value,
        ingredients: ingredientsInput.value,
        instruction: instructionInput.value
        }
      
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
            },
            body: JSON.stringify(mealInfo)
        }

        // pessimistic rendering
        fetch(`http://127.0.0.1:3000/meals/${id}`, configObj)
      .then(resp => resp.json())
      .then(json => {
          // use this json data to update DOM
          renderMealDivHTML(div, json) 
      })
}

function createEditFields(editBtn) {
    const mealDiv = editBtn.parentElement
    // let newUrl = mealDiv.children[0]
    let newName = mealDiv.children[1]
    let newIngredients = mealDiv.children[3]
    let newInstruction = mealDiv.children[5]
    
        newName.innerHTML = `Name:
          <input type="text" class="edit-name" value="${newName.innerText}"> 
        `
        newIngredients.innerHTML =  `
          <input type="text" class="edit-ingredients" value="${newIngredients.innerText}"> 
        `
        newInstruction.innerHTML =  `
           <input type="text" class="edit-instruction" value="${newInstruction.innerText}"> 
        `
    }


// optimistic rendering
function deleteMeal(e) {
    e.target.parentElement.remove()  // remove it before the fetch request
    const id = e.target.dataset.id

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json" 
        }
    }

    fetch(`http://127.0.0.1:3000/meals/${id}`, configObj)
      .then(resp => resp.json())
      .then(json => alert(json.message))
}

