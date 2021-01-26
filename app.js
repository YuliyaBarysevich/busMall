'use strict'


function ProductImage(image, name) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.name = name;
  this.image = image;

  ProductImage.allImages.push(this);
}

ProductImage.allImages = [];

var rounds = 3;
ProductImage.totalRounds = 0;



new ProductImage('img/bag.jpg', 'bag.jpg')
new ProductImage('img/banana.jpg', 'banana.jpg')
new ProductImage('img/bathroom.jpg', 'bathroom.jpg')
new ProductImage('img/boots.jpg', 'boots.jpg')
new ProductImage('img/breakfast.jpg', 'breakfast.jpg')
new ProductImage('img/bubblegum.jpg', 'bubblegum.jpg')
new ProductImage('img/chair.jpg', 'chair.jpg')
new ProductImage('img/cthulhu.jpg', 'cthulhu.jpg')
new ProductImage('img/dog-duck.jpg', 'dog-duck.jpg')
new ProductImage('img/dragon.jpg', 'dragon.jpg')
new ProductImage('img/pen.jpg', 'pen.jpg')
new ProductImage('img/pet-sweep.jpg', 'pet-sweep.jpg')
new ProductImage('img/scissors.jpg', 'scissors.jpg')
new ProductImage('img/shark.jpg', 'shark.jpg')
new ProductImage('img/sweep.png', 'sweep.png')
new ProductImage('img/tauntaun.jpg', 'tauntaun.jpg')
new ProductImage('img/unicorn.jpg', 'unicorn.jpg')
new ProductImage('img/usb.gif', 'usb.gif')
new ProductImage('img/water-can.jpg', 'water-can.jpg')
new ProductImage('img/wine-glass.jpg', 'wine-glass.jpg')

console.log(ProductImage.allImages)

var imagesContainer = document.getElementById('pic-container')
var leftImage = document.getElementById('left-image')
var middleImage = document.getElementById('middle-image')
var rightImage = document.getElementById('right-image')
var listElement = document.getElementById('list-data')


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
    for (var j = 0; j < ProductImage.allImages.length; j ++){
      var listPrint = document.createElement('li');
      listPrint.textContent = ProductImage.allImages[j].name + ' had ' + ProductImage.allImages[j].timesClicked + ' votes, and was seen ' + ProductImage.allImages[j].timesShown + ' times.'
      listElement.appendChild(listPrint)
    }
    imagesContainer.removeEventListener('click', clickImage)
    alert ('Thanks for voting')
  }
  var newProducts = generateProducts();
      renderProducts(newProducts[0], newProducts[1], newProducts[2])
}



