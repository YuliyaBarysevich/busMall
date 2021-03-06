'use strict'


//Global Variables
var products = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

//accessing elements in HTML
var imagesContainer = document.getElementById('pic-container')
var leftImage = document.getElementById('left-image')
var middleImage = document.getElementById('middle-image')
var rightImage = document.getElementById('right-image')
var listElement = document.getElementById('list-data')
var buttonElement = document.getElementById("collect-answers")

// constructor function
function ProductImage(name) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.name = name.substring(0, name.length-4);
  this.image = `img/${name}`;

ProductImage.allImages.push(this);
}


//arrays of all objects
ProductImage.allImages =  [];

//variables to count rounds of displaying
var rounds = 24;
ProductImage.totalRounds = 0;

//creating all new objects
for (var i = 0; i < products.length; i++) {
  new ProductImage(products[i])
}

// console.log(ProductImage.allImages)

function generateProducts() {
  var leftItem = Math.floor(Math.random() * ProductImage.allImages.length);

  var middleItem = Math.floor(Math.random() * ProductImage.allImages.length);

  var rightItem = Math.floor(Math.random() * ProductImage.allImages.length);

  while (leftItem === middleItem || middleItem === rightItem || leftItem === rightItem ) {
    if (leftItem === middleItem) {
      leftItem = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    if (middleItem === rightItem) {
      middleItem = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    if(leftItem === rightItem) {
      rightItem = Math.floor(Math.random() * ProductImage.allImages.length);
    } 
  }

  var leftProduct = ProductImage.allImages[leftItem];
  var middleProduct = ProductImage.allImages[middleItem];
  var rightProduct = ProductImage.allImages[rightItem];


  return [leftProduct, middleProduct, rightProduct]
}

//changed after lecture

function renderProducts () {

  var currentlyRendered = [leftImage.name, middleImage.name, rightImage.name]

  var newImages = generateProducts()
  // console.log(newImages)
 

  while (
    currentlyRendered[0] === newImages[0].name||
    currentlyRendered[1] === newImages[0].name||
    currentlyRendered[2] === newImages[0].name||
    currentlyRendered[0] === newImages[1].name||
    currentlyRendered[1] === newImages[1].name||
    currentlyRendered[2] === newImages[1].name||
    currentlyRendered[0] === newImages[2].name||
    currentlyRendered[1] === newImages[2].name||
    currentlyRendered[2] === newImages[2].name
  ) {
    newImages = generateProducts()
  }

  leftImage.src = newImages[0].image;
  leftImage.name = newImages[0].name;
  newImages[0].timesShown += 1;
  // leftImage.src = leftProduct.image;
  // leftProduct.timesShown += 1;

  middleImage.src = newImages[1].image;
  middleImage.name = newImages[1].name;
  newImages[1].timesShown += 1;
  // middleImage.src = middleProduct.image;
  // middleProduct.timesShown += 1;

  rightImage.src = newImages[2].image;
  rightImage.name = newImages[2].name;
  newImages[2].timesShown += 1;
  // rightImage.src = rightProduct.image;
  // rightProduct.timesShown += 1;

}

renderProducts ()




imagesContainer.addEventListener('click', clickImage)
function clickImage (event) {
  event.preventDefault();
  for (var i = 0; i < ProductImage.allImages.length; i++) {
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked++;
      ProductImage.totalRounds++;
    }
  }

  if (rounds < ProductImage.totalRounds) {
    imagesContainer.removeEventListener('click', clickImage)
    alert ('Thanks for your answers!')
  } else {
    var randomProducts = generateProducts()
    renderProducts(randomProducts[0], randomProducts[1], randomProducts[2])
  }
}
//works only with array of 0's 
var votesFromStorage = localStorage.getItem('Votes') || '[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';
var votesArray = JSON.parse(votesFromStorage);

var displayedFromStorage = localStorage.getItem('Displayed') || '[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';
var displayedTimesArray = JSON.parse(displayedFromStorage)


// BUTTON ELEMENT TO DISPLAY LIST WITH DATA
// buttonElement.addEventListener('submit', collectAnswers)
// function collectAnswers (event) {
//   event.preventDefault();
//   for (var j = 0; j < ProductImage.allImages.length; j ++){
//     var listPrint = document.createElement('li');
//     listPrint.textContent = ProductImage.allImages[j].name + ' had ' + ProductImage.allImages[j].timesClicked + ' votes, and was seen ' + ProductImage.allImages[j].timesShown + ' times.'
//     listElement.appendChild(listPrint)
//   }
//   buttonElement.removeEventListener('submit', collectAnswers)
//   listPrint.innerHTML = '';
//   var nextClient = generateProducts();
//   renderProducts(nextClient[0],nextClient[1], nextClient[2])
// }



//creating a chart. Shows up only when we press a button

buttonElement.addEventListener('submit', collectAnswers)
function collectAnswers (event) {
  event.preventDefault();
  //button disappears after submitting a form 
  buttonElement.style.display='none';
  var ctx = document.getElementById('myChart').getContext('2d');

  var totalVotes = []
  var totalTimesDisplayed = []

  for (var i = 0; i < ProductImage.allImages.length; i++) {
    totalVotes.push((ProductImage.allImages[i].timesClicked) +  votesArray[i])
    totalTimesDisplayed.push((ProductImage.allImages[i].timesShown) + displayedTimesArray[i])
  }
  console.log(totalVotes)
  console.log(totalTimesDisplayed)

  var votesAsString = JSON.stringify(totalVotes);
  localStorage.setItem('Votes', votesAsString);
  var timesDisplayedString = JSON.stringify(totalTimesDisplayed);
  localStorage.setItem('Displayed', timesDisplayedString);


  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Times Clicked',
  
        data: totalVotes,
        
        backgroundColor: new Array(20).fill('rgba(242, 231,	80, 0.9)'),
        // ['rgba(255, 206, 86, 5)'],
        borderWidth: 1
      },{
        label: 'Times Displayed',
  
        data: totalTimesDisplayed,
        
        backgroundColor: new Array(20).fill('rgba(46, 60, 140, 0.9)'),
        //  ['rgba(54, 162, 235, 0.8)',],
        borderWidth: 1
      } ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
       }]
     }
    }
  });

}

