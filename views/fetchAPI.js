const productsList = document.getElementById("productsList")
const searchBar = document.getElementById("searchBar")
let shoeProducts = []

/* When the user types in the search bar, we get the input and transforms it to lowercase
 (so it doesn't affect the filter whether it's uppercase or lowercase). Then for each product we compare its name 
 to the one's in the API. Finally, we call the display function to display the result on the page */
searchBar.addEventListener('keyup', (e) => {
    var searchInput = e.target.value
    searchInput = searchInput.toLowerCase()
    //console.log(searchInput)
    //console.log("A = ", shoeProducts)
    const filteredProducts = shoeProducts.filter(product => {
        return(
            product.name.toLowerCase().includes(searchInput)
        )
    })
    //console.log(filteredProducts)
    displaySearchProducts(filteredProducts)
})

/* Function that calls the API and tranforms the data into JSON and then into an array */
const loadProducts = async () => {
    try {
        const res = await fetch('https://webshop.wm3.se/api/v1/shop/products.json?media_file=true')
        shoeProducts = await res.json()
        shoeProducts = shoeProducts.products
        //console.log("B = ",shoeProducts)
        displayFirstSixProducts(shoeProducts)
        /*shoeProducts = shoeProducts.products*/
        //console.log("C = ",shoeProducts)
    }
    catch (err) {
        console.log(err)
    }
}

/* Function that displays the user's search result */
function displaySearchProducts (data){
    const ul = document.getElementById("productsList")
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    for(i=0; i<data.length; i++){
        // get the name and image of each product
        const shoeName = data[i].name
        const shoeImage = data[i].product_image.url

        // for each product, create a list contaning the image and the name
        const product = document.createElement("li")
        product.className = "product"
        
        const shoeImg = document.createElement("img")
        shoeImg.src = shoeImage
        shoeImg.style = "height: 100%; width: 100%; object-fit: contain;"

        const name = document.createElement("h6")
        name.innerHTML = shoeName

        productsList.appendChild(product)
        product.appendChild(shoeImg)
        product.appendChild(name)

    }
}

/* Function that only displays the first 6 products of the API call (landing page)*/
function displayFirstSixProducts(data) {
    console.log("D = ", data)
    // get the first 6 products
    for(i=0; i<6; i++){
        // get the name and image of each product
        const shoeName = data[i].name
        const shoeImage = data[i].product_image.url

        // for each product, create a list contaning the image and the name
        const product = document.createElement("li")
        product.className = "product"
        
        const shoeImg = document.createElement("img")
        shoeImg.src = shoeImage
        shoeImg.style = "height: 100%; width: 100%; object-fit: contain;"

        const name = document.createElement("h6")
        name.innerHTML = shoeName
        //name.style = "height: 100%; width: 100%; object-fit: contain;"
        
        productsList.appendChild(product)
        product.appendChild(shoeImg)
        product.appendChild(name)

    }
}

loadProducts()