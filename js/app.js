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
		let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
		
		obstacle.style.left = `${obstaclePos -= 2.5}px`

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
				const wowAudioTag = document.querySelector('.audio-wow')
				if(wowAudioTag !== null) {
					document.querySelector('.audio-wow').remove()
				}
				let audioTag = document.createElement("audio")
				audioTag.classList = "audio-wow"
				audioTag.setAttribute("autoplay", "")
				containerForGameContainer.appendChild(audioTag)

				let sourceTag = document.createElement("source")
				sourceTag.setAttribute("src", "./assets/wow.mp3")
				sourceTag.setAttribute("type", "audio/mp3")
				document.querySelector('.audio-wow').appendChild(sourceTag)

				obstaclePos = obstaclePosWidth
				obstacle.style.left = `${obstaclePos}px`

				if(highScoreActive === false) {
					highScoreActive = true
					let musicContainerLoc = document.querySelector('.music-container')
					containerForGameContainer.insertBefore(highScore, musicContainerLoc)
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

	const musicContainer = document.createElement("div")
	musicContainer.classList = "music-container"
	containerForGameContainer.appendChild(musicContainer)

	let audioTag = document.createElement("audio")
	audioTag.classList = "audio"
	audioTag.setAttribute("controls", "")
	audioTag.setAttribute("autoplay", "")
	audioTag.setAttribute("loop", "")
	musicContainer.appendChild(audioTag)

	let sourceTag = document.createElement("source")
	sourceTag.setAttribute("src", "./assets/soundtrack2.wav")
	sourceTag.setAttribute("type", "audio/wav")
	audioTag.appendChild(sourceTag)

	let aTag = document.createElement("a")
	aTag.setAttribute("href", "https://open.spotify.com/artist/5ccG8z1EBz6gkvep3gTK98?si=E_VxWNaGToWxDUFxHHAnjw")
	musicContainer.appendChild(aTag)

	let iTag = document.createElement('i')
	iTag.classList = "fa-brands fa-spotify fa-3x"
	aTag.appendChild(iTag)
})

document.body.addEventListener("keyup", (event) => {
	if(event.keyCode === 32) {
		jump()
	}
})

document.body.addEventListener("touchend", () => jump())