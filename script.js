const container = document.querySelector('.container');
buildTheGrid(10); //building initial grid

//initializing variables
const resizeButton = document.querySelector('.resize');
const resetButton = document.querySelector('.reset');
const buttonRGB = document.querySelector('.RGB-color');
const buttonShadeOfBlack = document.querySelector('.black-shade');
const pickedColor = document.querySelector('.color-input');

//adding event listeners for buttons
resizeButton.addEventListener('click', resizeTheGrid);
resetButton.addEventListener('click', resetTheGrid);
buttonRGB.addEventListener('click', setRandomColor);
buttonShadeOfBlack.addEventListener('click', setColorShadeOfBlack);
pickedColor.addEventListener('input', setPickedColor);


function buildTheGrid(cells) {
	container.style.cssText = `grid-template-columns: repeat(${cells}, 1fr)`;
	container.innerHTML = '';
	for (let i = 0; i < cells * cells; i++) {
		let gridCell = document.createElement('div');
		gridCell.classList.add('grid-cell');
		container.appendChild(gridCell);
	}
	let allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(cell => {
		cell.onmouseover = function() {
			this.style.backgroundColor = '#000';
		}
	})
}


function resizeTheGrid() {
	let cellsNew = document.querySelector('.number').value;
	if (cellsNew > 60) {
		alert('Please type a number less than 60.');
		return;
	} else {
		container.innerHTML = ''; //removing old grid before building new one
		buildTheGrid(cellsNew);
	}
}


//full reset
function resetTheGrid() {
	let allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(cell => {
		cell.style.backgroundColor = 'rgba(0, 0, 0, 0.01)'; //0.01 for the shade of black
	})
}


//random color
function setRandomColor() {
	resetTheGrid();
	let allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(cell => {
		cell.onmouseover = function() {
			let randomColor = Math.floor(Math.random()*16777215).toString(16);
			cell.style.backgroundColor = `#${randomColor}`; 
		}
	})
}


//shade of black
function setColorShadeOfBlack() {
	resetTheGrid();
	let allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(cell => {
		cell.onmouseover = function() {
			let currentOpacity = Number(cell.style.backgroundColor.slice(-4, -1));
			if (currentOpacity < 1) {
				cell.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
			} else {
				cell.style.backgroundColor = 'rgba(0, 0, 0, 1)';
			}
		}
	})
}


//chosen color
function setPickedColor() {
	resetTheGrid();
	let allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(cell => {
		cell.onmouseover = function() {
			cell.style.backgroundColor = pickedColor.value;
		}
	})
}