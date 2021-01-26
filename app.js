'use strict'

// constructor function
function ProductImage(image, name) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.name = name;
  this.image = image;

  ProductImage.allImages.push(this);
}

//arrays of all objects
ProductImage.allImages = [];

//declaring how many times pictures will display
var rounds = 3;
//variable to increment each time user makes a choice 
ProductImage.totalRounds = 0;



new ProductImage('img/bag.jpg', 'bag')
new ProductImage('img/banana.jpg', 'banana')
new ProductImage('img/bathroom.jpg', 'bathroom')
new ProductImage('img/boots.jpg', 'boots')
new ProductImage('img/breakfast.jpg', 'breakfast')
new ProductImage('img/bubblegum.jpg', 'bubblegum')
new ProductImage('img/chair.jpg', 'chair')
new ProductImage('img/cthulhu.jpg', 'cthulhu')
new ProductImage('img/dog-duck.jpg', 'dog-duck')
new ProductImage('img/dragon.jpg', 'dragon')
new ProductImage('img/pen.jpg', 'pen')
new ProductImage('img/pet-sweep.jpg', 'pet-sweep')
new ProductImage('img/scissors.jpg', 'scissors')
new ProductImage('img/shark.jpg', 'shark')
new ProductImage('img/sweep.png', 'sweep')
new ProductImage('img/tauntaun.jpg', 'tauntaun')
new ProductImage('img/unicorn.jpg', 'unicorn')
new ProductImage('img/usb.gif', 'usb')
new ProductImage('img/water-can.jpg', 'water-can')
new ProductImage('img/wine-glass.jpg', 'wine-glass')

console.log(ProductImage.allImages)

//accessing elements in HTML
var imagesContainer = document.getElementById('pic-container')
var leftImage = document.getElementById('left-image')
var middleImage = document.getElementById('middle-image')
var rightImage = document.getElementById('right-image')
var listElement = document.getElementById('list-data')
var buttonElement = document.getElementById("collect-answers")


function generateProducts() {
  var leftItem = Math.floor(Math.random() * ProductImage.allImages.length);

  var middleItem = Math.floor(Math.random() * ProductImage.allImages.length);

  var rightItem = Math.floor(Math.random() * ProductImage.allImages.length);

  while (leftItem === middleItem) {
    middleItem = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (middleItem === rightItem) {
    rightItem = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  while (leftItem === rightItem) {
    rightItem = Math.floor(Math.random() * ProductImage.allImages.length);
  }

  var leftProduct = ProductImage.allImages[leftItem];
  var middleProduct = ProductImage.allImages[middleItem];
  var rightProduct = ProductImage.allImages[rightItem];

  return [leftProduct, middleProduct, rightProduct]
}

function renderProducts (leftProduct, middleProduct, rightProduct) {
  leftImage.src = leftProduct.image;
  leftProduct.timesShown += 1;

  middleImage.src = middleProduct.image;
  middleProduct.timesShown += 1;

  rightImage.src = rightProduct.image;
  rightProduct.timesShown += 1;
}

var randomProducts = generateProducts();
renderProducts (randomProducts[0], randomProducts[1], randomProducts[2])


imagesContainer.addEventListener('click', clickImage)
function clickImage (event) {
  event.preventDefault();
  for (var i = 0; i < ProductImage.allImages.length; i++) {
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked += 1;

      ProductImage.totalRounds += 1;
    }
  }
  if (ProductImage.totalRounds > rounds) {
    imagesContainer.removeEventListener('click', clickImage)
    alert ('Thanks for your answers!')
  }
  var newProducts = generateProducts();
  renderProducts(newProducts[0], newProducts[1], newProducts[2])
}

buttonElement.addEventListener('submit', collectAnswers)
function collectAnswers (event) {
  event.preventDefault();
  for (var j = 0; j < ProductImage.allImages.length; j ++){
    var listPrint = document.createElement('li');
    listPrint.textContent = ProductImage.allImages[j].name + ' had ' + ProductImage.allImages[j].timesClicked + ' votes, and was seen ' + ProductImage.allImages[j].timesShown + ' times.'
    listElement.appendChild(listPrint)
  }
  // listPrint.innerHTML = '';
  // var nextClient = generateProducts();
  // renderProducts(nextClient[0],nextClient[1], nextClient[2])
}


