
const port = "http://127.0.0.1:3000"
const mealApi = new MealApi(port)
const categoryApi = new CategoryApi(port)
const list = document.getElementById("item-list")
const mealForm = document.querySelector("#meal-form")
const nameInput = document.getElementById("meal-name")
const thumbInput = document.getElementById("meal-thumb")
const ingredientsInput = document.getElementById("meal-ingredients")
const instructionInput = document.getElementById("meal-instruction")
const dropdown = document.getElementById('cat-dropdown')
const catNameInput = document.getElementById("category-name")

mealApi.fetchAllMeals()

categoryApi.fetchAllCategories()

mealForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    mealApi.createMeal()
    e.target.reset()
}
