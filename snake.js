
let canvas = document.getElementById('view')

canvas.width = '480';
canvas.height = '480';
canvas.style.border = '1px solid black'

canvas = canvas.getContext('2d')

let snake = [
	{ x:100, y:100, color:'lightblue' },
	{ x:120, y:100, color:'lightblue' },
	{ x:140, y:100, color:'lightblue' },
	{ x:160, y:100, color:'lightblue' },
	{ x:180, y:100, color:'lightblue' },
]

let currentSnakeDirection = 'ArrowRight'
let currentFood = {x:null, y:null}
let score = 0

function drawSnake(){
	let x = false;
	snake.forEach(piece => {
		if(x = true){
			canvas.fillStyle = 'blue'
			canvas.fillRect(piece.x, piece.y, 10, 10)
			canvas.strokeRect(piece.x, piece.y, 10, 10)
		}else{
			canvas.fillStyle = 'red'
			canvas.fillRect(piece.x, piece.y, 10, 10)
			canvas.strokeRect(piece.x, piece.y, 10, 10)
		}
		
	})
}

function moveSnake(){
	if(currentSnakeDirection == 'ArrowRight'){
		snake.pop()
		snake.unshift({x : snake[0].x + 10, y : snake[0].y})
	}else if(currentSnakeDirection == 'ArrowLeft'){
		snake.pop()
		snake.unshift({x : snake[0].x - 10, y : snake[0].y})
	}else if(currentSnakeDirection == 'ArrowDown'){
		snake.pop()
		snake.unshift({x : snake[0].x, y : snake[0].y + 10})
	}else if(currentSnakeDirection == 'ArrowUp'){
		snake.pop()
		snake.unshift({x : snake[0].x, y : snake[0].y - 10})
	}
}

function checkForCollision(){
	if(snake[0].x < -10 || snake[0].x > 490) return true
	if(snake[0].y < -10 || snake[0].y > 490) return true

	// If not out of play area, check if touching food
	let xdelta = Math.max(snake[0].x, currentFood.x) - Math.min(snake[0].x, currentFood.x)
	let ydelta = Math.max(snake[0].y, currentFood.y) - Math.min(snake[0].y, currentFood.y)

	if(ydelta < 15 && xdelta < 15) generateFood(true)
}


function generateFood(addPoint){
	currentFood.x = Math.floor(Math.random()*480)
	currentFood.y = Math.floor(Math.random()*480)

	if(addPoint){
		snake.unshift({x : snake[0].x + 10, y : snake[0].y})
		score += 1
		document.getElementById('score').innerHTML = score
	}
}

function drawFood(){
	canvas.fillStyle = 'tomato'
	canvas.fillRect(currentFood.x, currentFood.y, 15, 15)
	canvas.strokeRect(currentFood.x, currentFood.y, 15, 15)
}

document.addEventListener('keydown', function(e){
	currentSnakeDirection = e.key;
	// loop()
})

function loop(){
	if(checkForCollision()) return

	canvas.clearRect(0, 0, 480, 480)
	moveSnake()

	drawFood()
	drawSnake()
	
	requestAnimationFrame(loop, 1)
}

generateFood()
loop()