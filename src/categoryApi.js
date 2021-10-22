class CategoryApi{

    constructor(port) {
        this.baseUrl = `${port}/categories`
    }

    fetchAllCategories() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(c => {
                const frontendC = new Category(c)
                frontendC.addToDom()
                frontendC.addToDropDown()  
            })
        })
        }
        

}