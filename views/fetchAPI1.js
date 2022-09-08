fetch('https://webshop.wm3.se/api/v1/shop/products.json?media_file=true')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then(function (data) {   
      console.log(data) 
      displayData(data)
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error)
    })
    
function displayData(data) {
  // get rows
  const row1 = document.getElementById("row1")
  const row2 = document.getElementById("row2")
  // get the first 3 products
  for(i=0; i<3; i++){
    // get the name and image of each product
    const shoeName = data.products[i].name
    
    // for each product, create a div contaning the image and the name
    const shoeDiv = document.createElement("div")
    shoeDiv.id = i+1
    shoeDiv.className = "col"
    const shoeImg = document.createElement("img")
    shoeImg.src = data.products[i].product_image.url
    shoeImg.style = "height: 100%; width: 100%; object-fit: contain"
    const title = document.createElement("p")

    title.innerHTML = shoeName
    row1.appendChild(shoeDiv)
    shoeDiv.appendChild(shoeImg)
    shoeDiv.appendChild(title)

  }

  // get the last 3 products
  for(i=3; i<6; i++){
    // get the name and image of each product
    const shoeName = data.products[i].name
    
    // for each product, create a div contaning the image and the name
    const shoeDiv = document.createElement("div")
    shoeDiv.id = i+1
    shoeDiv.className = "col"
    const shoeImg = document.createElement("img")
    shoeImg.src = data.products[i].product_image.url
    shoeImg.style = "height: 100%; width: 100%; object-fit: contain"
    const title = document.createElement("p")

    title.innerHTML = shoeName
    row2.appendChild(shoeDiv)
    shoeDiv.appendChild(shoeImg)
    shoeDiv.appendChild(title)

  }

  /*const shoeName = data.products[0].name

  const shoeDiv = document.getElementById("col1")
  
  const shoeImg = document.createElement("img")
  const title = document.createElement("p")

  shoeImg.src = data.products[0].product_image.url
  
  title.innerHTML = shoeName
  shoeDiv.appendChild(shoeImg)
  shoeDiv.appendChild(title)*/
  
}
