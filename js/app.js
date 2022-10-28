const containerForGameContainer = document.querySelector('.flex-container')
const gameContainer = document.querySelector('.game-container')
const player = document.querySelector('.player')
const obstacle = document.querySelector('.obstacle')

const mediaQuery = window.matchMedia('(orientation:portrait)')

let counter = 0
let highScoreTracker = 0
let highScoreActive = false
let startTimerSpeed = 1
let obstaclePosWidth = 480
let obstaclePos = 480
let gameOver = false

const score = document.createElement("h3")
score.classList.add("score")
score.innerHTML = `Points: ${counter}`
gameContainer.prepend(score)

const highScore = document.createElement('h2')
highScore.classList.add('high-score')
highScore.innerHTML = `High score: ${highScoreTracker}`

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

function startTimer() {
	const checkCollision = setInterval(() => {
		const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
		// console.log(playerTop)
		let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
		// console.log(obstacleLeft)
		
		obstacle.style.left = `${obstaclePos -= 2}px`

		if(obstacleLeft <= 50 && obstacleLeft > 30 && playerTop >= 108) {
			clearInterval(checkCollision)
			gameOver = true

			if(counter > highScoreTracker) {
				highScoreTracker = counter
				highScore.innerHTML = `High score: ${highScoreTracker}`
			}

			const youLose = document.createElement("h1")
			youLose.classList.add("you-lose")
			youLose.innerHTML = "YOU LOST LMAO"
			gameContainer.appendChild(youLose)

			const restart = document.createElement("button")
			restart.classList.add("restart")
			restart.innerHTML = "Restart"
			gameContainer.appendChild(restart)

			const restartLocation = document.querySelector(".restart")
			restartLocation.addEventListener("click", () => {
				obstaclePos = obstaclePosWidth
				obstacle.style.left = `${obstaclePos}px`

				if(highScoreActive === false) {
					highScoreActive = true
					containerForGameContainer.appendChild(highScore)
				}

				counter = 0
				score.innerHTML = `Points: ${counter}`
				gameOver = false
				const youLoseLocation = document.querySelector('.you-lose')
				youLoseLocation.remove()
				restartLocation.remove()
				startTimer()
				startScoreTracker()
			})
		}

		if(obstaclePos === 0) {
			obstaclePos = obstaclePosWidth
		}
	},startTimerSpeed)
}

function startScoreTracker() {
	const addScore = setInterval(() => {
		const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
		const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
		if(obstacleLeft < 50 && obstacleLeft > 30 && playerTop <= 129 && gameOver === false) {
			counter = counter += 1
		} 
		if(gameOver === true) {
			clearInterval(addScore)
		}
		score.innerHTML = `Points: ${counter}`
	},5)
}

function handleDeviceChange(event) {
	if(event.matches) {
		console.log("Media query matched!")
		obstaclePos = 280
		obstaclePosWidth = 280
		startTimerSpeed = 10
	}
}

handleDeviceChange(mediaQuery)




const startButtonLocation = document.querySelector(".start-button")
startButtonLocation.addEventListener("click", () => {
	startTimer()
	startScoreTracker()
	startButtonLocation.style.display = "none"

	let audioTag = document.createElement("audio")
	audioTag.classList = "audio"
	audioTag.setAttribute("controls", "")
	audioTag.setAttribute("autoplay", "")
	audioTag.setAttribute("loop", "")
	containerForGameContainer.appendChild(audioTag)

	let sourceTag = document.createElement("source")
	sourceTag.setAttribute("src", "./assets/soundtrack.wav")
	sourceTag.setAttribute("type", "audio/wav")
	audioTag.appendChild(sourceTag)
})

document.body.addEventListener("keyup", (event) => {
	if(event.keyCode === 32) {
		jump()
	}
})

document.body.addEventListener("touchend", () => jump())