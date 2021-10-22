// the responsibility for this file -
// handle all fetch requests for the meals

class MealApi {

    constructor(port) {
        this.baseUrl = `${port}/meals`  // easy to update in this way
    }

    
    // this refers to an instatiated mealApi object, so that the below function is an instance function
    // this is how we handle the collection back from the api
    fetchAllMeals() {
        fetch(this.baseUrl)
          .then(resp => resp.json())
          .then(jsonArrayFromBackend => {
            jsonArrayFromBackend.forEach((meal) => {
                const fontendMeal = new Meal(meal)
                fontendMeal.attachToDom()
            })
          })
        }      


        createMeal() {
            // make the params hash to send back to the backend
            const mealInfo = {
                name: nameInput.value,
                thumb: thumbInput.value,
                ingredients: ingredientsInput.value,
                instruction: instructionInput.value
            }
          
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json" 
                },
                body: JSON.stringify(mealInfo)
            }
          
            // pessimistic rendering
            fetch(this.baseUrl, configObj)
              .then(resp => resp.json())
              .then(data => {
                  const newMeal = new Meal(data)
                  newMeal.attachToDom()
              })
          }

          

}
