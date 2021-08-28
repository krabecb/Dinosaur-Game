const containerForGameContainer = document.querySelector('.container-for-a-container')
const gameContainer = document.querySelector('.game-container')
const player = document.querySelector('.player')
const obstacle = document.querySelector('.obstacle')

let counter = 0

const score = document.createElement("h3")
score.classList.add("score")
score.innerHTML = `Points: ${counter}`
gameContainer.prepend(score)

const startButton = document.createElement("button")
startButton.classList.add("start-button")
startButton.innerHTML = "Start"
containerForGameContainer.appendChild(startButton)

function jump() {
	if(player.classList !== "animate") {
		player.classList.add("animate")
	}
	setTimeout(() => {
		player.classList.remove("animate")
	}, 500)
}

const checkCollision = setInterval(() => {
	const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
	const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
	if(obstacleLeft < 20 && obstacleLeft > 0 && playerTop >= 130) {
		obstacle.style.animation = "none"
		obstacle.style.display = "none"
		clearInterval(checkCollision)
		clearInterval(addScore)
		const youLose = document.createElement("h1")
		youLose.classList.add("you-lose")
		youLose.innerHTML = "YOU LOST LMAO"
		gameContainer.appendChild(youLose)
	}
},10)

const addScore = setInterval(() => {
	const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
	const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
	if(obstacleLeft < 30 && playerTop <= 129) {
		counter = counter += 1
	}
	score.innerHTML = `Points: ${counter}`
},5)




document.body.addEventListener("keyup", (event) => {
	if(event.keyCode === 32) {
		jump()
	}
})

document.body.addEventListener("touchend", () => jump())