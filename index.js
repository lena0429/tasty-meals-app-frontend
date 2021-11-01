
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
           if (searchTerm.length !== 0) {
            let mealResult = []
            const searchString = titleCase(searchTerm)
            mainDiv.style.display = "none"
            const homeButton = document.createElement("button")
            homeButton.classList.add("btn-lg", "btn-info")
                homeButton.innerText = "Back to Home"
                resultsContainer.append(homeButton)
                homeButton.addEventListener("click", backToHome)
            Meal.all.map((meal) => {
                if(meal.name.split(" ").includes(`${searchString}`) === true) {
                    mealResult.push(meal)
                        for(const meal of mealResult) {
                        meal.render()
                        resultsContainer.append(meal.element)
                        }
                }
            })
            } else {
                alert("Please input someting.");
                
    }
    e.target.reset()
}
    

    function backToHome() {
        resultsContainer.innerHTML = ""
        mainDiv.style.display = ""
        Meal.attachAll()
    }

    function titleCase(string) {
        return string[0].toUpperCase() + string.slice(1)
    }



