class Category {

    static all = []
    static categoryContainer = document.getElementById("category-container")

    constructor({id, name}) {
        this.id = id
        this.name = name
        this.active = false

        this.element = document.createElement("button")

        Category.all.push(this)
    }

    meals(){
        return Meal.all.filter((meal) => meal.categoryId == this.id)
    }


      render() {
        this.element.innerText = this.name
        this.element.id = `category-${this.id}`
        return this.element
      }

      addToDom(){
        Category.categoryContainer.append(this.render())
        this.addListeners()
      }

      addListeners(){
          this.element.addEventListener('click', this.setActiveCategory)
      }

      setActiveCategory = (e) => {
        let filteredCategory 
        Category.all.forEach(c => {
            if(c.element === this.element && !this.active){
                c.element.classList.add('activated')
                c.active = true
                filteredCategory = c
            }else{
                c.element.classList.remove('activated')
                c.active = false
            }

            Meal.filterByCategory(filteredCategory)
        }) 
    }

    addToDropDown(){
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        dropdown.append(option)
    }

}


    