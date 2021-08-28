let gameContainer = document.querySelector('.game-container')
let player = document.querySelector('.player')
let obstacle = document.querySelector('.obstacle')

function jump() {
	if(player.classList !== "animate") {
		player.classList.add("animate")
	}
	setTimeout(() => {
		player.classList.remove("animate")
	}, 500)
}

gameContainer.addEventListener("click", () => {jump()})