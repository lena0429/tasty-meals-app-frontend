
const port = "https://floating-temple-36360.herokuapp.com"
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
        mainDiv.style.display = "none"
        const searchTerm = searchInput.value
        const searchString = titleCase(searchTerm)
                let mealResult = []
                Meal.all.map((meal) => {
                   if(meal.name.split(" ").includes(`${searchString}`) === true) {
                      mealResult.push(meal)
                      for(const meal of mealResult) {
                        meal.render()
                        resultsContainer.append(meal.element)
                        e.target.reset()
                      }
                 } 
    })
}

    resetButton.addEventListener("click", function() {
        resultsContainer.innerHTML = ""
        mainDiv.style.display = ""
        Meal.attachAll()
    })

    function titleCase(string) {
        return string[0].toUpperCase() + string.slice(1)
    }



