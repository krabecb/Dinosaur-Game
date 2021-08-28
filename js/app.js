const gameContainer = document.querySelector('.game-container')
const player = document.querySelector('.player')
const obstacle = document.querySelector('.obstacle')

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
		alert("YOU LOSE!")
	}
},10)

gameContainer.addEventListener("click", () => {jump()})