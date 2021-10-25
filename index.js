
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
const resetButton =document.getElementById("reset-button")
const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-form")
const mainDiv = document.getElementById("main-div")
const resultsContainer = document.getElementById("results-container")

mealApi.fetchAllMeals()

categoryApi.fetchAllCategories()

mealForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    mealApi.createMeal()
    e.target.reset()
}

searchForm.addEventListener("submit", handleSearchClick)

function handleSearchClick(e){
    e.preventDefault()
    const searchTerm = searchInput.value
    let mealResult = []
    Meal.all.map((meal) => {
        if(meal.ingredients.split(", ").includes(`${searchTerm}`) === true) {
            mealResult.push(meal)
        }
        })
        mainDiv.style.display = "none"
        for(const meal of mealResult) {
           meal.render()
           resultsContainer.append(meal.element)

        }
        e.target.reset()
}

resetButton.addEventListener("click", handleReset)

function handleReset(e) {
    resultsContainer.innerHTML = ""
    mainDiv.style.display = ""
}


