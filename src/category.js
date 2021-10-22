
function fetchAllCategories() {
    fetch("http://127.0.0.1:3000/categories")
    .then(resp => resp.json())
    .then(renderCategories)
    }
    
    const catgeoryList = document.querySelector("#catgeory-list") 
    
    function renderCategories(categoryArray) {
        categoryArray.forEach((category) => {
            renderCategory(category)
        })
    }
    
    function renderCategory(category) {
      const categoryDiv = document.createElement("div")
      categoryDiv.id = `category-div-${category['id']}`
      categoryDiv.innerHTML = `
            <div class="col-sm-3 text-center">
            <img src="${category['image']}"  style="background-color: grey" class="rounded border">
            <p class="font-weight-bold">${category["name"]}</p>
            </div>
            <br>
            `
        catgeoryList.append(categoryDiv)
    }