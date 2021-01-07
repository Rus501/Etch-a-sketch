const container = document.querySelector('.container');
let cells = 10;
container.style.cssText = `grid-template-columns: repeat(${cells}, 1fr)`;
let gridCell = '';

const resizeButton = document.querySelector('.resize');
resizeButton.addEventListener('click', resizeTheGrid);

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetTheGrid);

const buttonRGB = document.querySelector('.RGB-color');
buttonRGB.addEventListener('click', setRandomColor);

const buttonShadeOfBlack = document.querySelector('.black-shade');
buttonShadeOfBlack.addEventListener('click', setColorShadeOfBlack);

const pickedColor = document.querySelector('.color-input');
pickedColor.addEventListener('input', changeColor);


for (let i = 0; i < cells ** 2; i++) {
	gridCell = document.createElement('div');
	gridCell.classList.add('grid-cell');
	container.appendChild(gridCell);
}
let allGridCells = '';

allGridCells = document.querySelectorAll('.grid-cell');
allGridCells.forEach(item => {
	item.addEventListener('mouseover', setColorBlack);
});

function resizeTheGrid() {
	let cellsNew = document.querySelector('.number').value;
	if (cellsNew > 60) {
		alert('Please type a number less than 60');
		return;
	} else {
		container.innerHTML = '';
		cells = cellsNew;
		container.style.cssText = `grid-template-columns: repeat(${cells}, 1fr)`;
		for (let i = 0; i < cells ** 2; i++) {
			gridCell = document.createElement('div');
			gridCell.classList.add('grid-cell');
			container.appendChild(gridCell);
		}
		allGridCells = document.querySelectorAll('.grid-cell');
		allGridCells.forEach(item => {
			item.addEventListener('mouseover', setColorBlack);
		});
	}
	return;
}

function setColorBlack() {
	this.classList.remove('reset-cell');
	this.classList.add('hovered');
	return;
}


//full reset
function resetTheGrid() {
	container.innerHTML = '';
	container.style.cssText = `grid-template-columns: repeat(${cells}, 1fr)`;
	for (let i = 0; i < cells ** 2; i++) {
		gridCell = document.createElement('div');
		gridCell.classList.add('grid-cell');
		container.appendChild(gridCell);
	}
	allGridCells = document.querySelectorAll('.grid-cell');
	allGridCells.forEach(item => {
		item.addEventListener('mouseover', setColorBlack);
	});
	return;
}


//random color
function setRandomColor() {
	resetTheGrid();
	allGridCells.forEach(item => {
		item.removeEventListener('mouseover', setColorBlack);
		item.removeEventListener('mouseover', shadeOfBlack);
		item.removeEventListener('mouseover', changeColorToAny);
		item.addEventListener('mouseover', changeColorRGB);
	});
	return;
}

function changeColorRGB() {
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	this.classList.remove('reset-cell');
	this.style.cssText = `background-color: #${randomColor}`;
	return;
}


//chosen color
function changeColor() {
	resetTheGrid();
	allGridCells.forEach(item => {
		item.removeEventListener('mouseover', setColorBlack);
		item.removeEventListener('mouseover', changeColorRGB);
		item.removeEventListener('mouseover', shadeOfBlack);
		item.addEventListener('mouseover', changeColorToAny);
	});
	return;
}

function changeColorToAny() {
	this.classList.remove('reset-cell');
	this.style.cssText = `background-color: ${pickedColor.value}`;
	return;
}


//shade of black
function setColorShadeOfBlack() {
	resetTheGrid();
	allGridCells.forEach(item => {
		item.removeEventListener('mouseover', setColorBlack);
		item.removeEventListener('mouseover', changeColorRGB);
		item.removeEventListener('mouseover', changeColorToAny);
		item.addEventListener('mouseover', shadeOfBlack);
		item.classList.add('hack');
	});
	return;
}

function shadeOfBlack() {
	this.classList.remove('reset-cell');
	this.classList.add('hovered');
	let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
	this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	if (currentOpacity < 1) {
		this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
		return;
	} else {
		return this.style.backgroundColor = 'rgba(1, 0, 0, 1)';
	}
	return;
}