
const port = "http://127.0.0.1:3000"
const mealApi = new MealApi(port)

const mealForm = document.querySelector("#meal-form")
const nameInput = document.getElementById("meal-name")
const thumbInput = document.getElementById("meal-thumb")
const ingredientsInput = document.getElementById("meal-ingredients")
const instructionInput = document.getElementById("meal-instruction")

mealApi.fetchAllMeals()

fetchAllCategories()

mealForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    mealApi.createMeal()
    e.target.reset()
}
