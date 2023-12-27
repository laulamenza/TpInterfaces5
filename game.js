"use strict";

class Game {
	constructor() {
		this.lifes = 3;
		this.points = 0;
		this.nave = new Nave();
		this.enemys = [];
		this.colission = false;
		this.time = 60;
		this.loopEnemy = null;
	}

	start() {
		this.showPoints();
		this.gameLoop();
		this.loopEnemy = setInterval(() => {
			if (this.enemys.length <= 20) {
				this.newEnemy();
			}
		}, 3000);
	}

	//Muestra puntos y vidas
	showPoints() {
		let div = document.getElementById("pyl");
		div.style.display = "flex";
	}

	elevar() {
		this.nave.elevar();
	}

	caer() {
		this.nave.caer();
	}

	//RESTA UNA VIDA
	restLife() {
		this.lifes -= 1;
	}

	//RETORNA LAS VIDAS
	getLifes() {
		return this.lifes;
	}

	//SUMA PUNTOS
	sumPoints(points) {
		this.points += points;
	}

	//RETORNA LOS PUNTOS
	getPoints() {
		return this.points;
	}

	newEnemy() {
		let enemy = new Enemy();
		this.enemys.push(enemy);
		enemy.enemy.addEventListener("animationend", () => {
			if (!this.colission) {
				this.sumPoints(100);
			}
			this.remove(enemy);
		});
	}

	remove(e) {
		document.getElementById("contenedor").removeChild(e.enemy);
	}

	checkCollision(rect1, rect2) {
		this.colission = false;
		if (
			!(
				rect1.right < rect2.left ||
				rect1.left > rect2.right ||
				rect1.bottom < rect2.top ||
				rect1.top > rect2.bottom
			)
		) {
			this.colission = true;
			return true;
		}
		return false;
	}

	gameLoop() {
		if (this.lifes == 0) {
			this.gameOver();
			let divLifes = document.getElementById("lifes");
			divLifes.textContent = this.getLifes();
			return;
		}

		if (this.time <= 0) {
			this.finishGame();
			return;
		}

		//Actualizo el timer
		this.time -= 1 / 60;
		let timeForm = Math.round(this.time);
		let divTimer = document.getElementById("time");
		divTimer.textContent = timeForm;

		//Actualizo las vidas en pantalla
		let divLifes = document.getElementById("lifes");
		divLifes.textContent = this.getLifes();

		// Actualizo los puntos en pantalla
		let divPoints = document.getElementById("points");
		divPoints.textContent = this.getPoints();

		let rect1 = this.nave.status();
		for (let i = 0; i < this.enemys.length; i++) {
			// Obtener el estado del enemigo actual
			let rect2 = this.enemys[i].status();
			// Verificar si hay colisión
			if (this.checkCollision(rect1, rect2)) {
				this.restLife();
				this.remove(this.enemys[i]);
				//return;
			}
		}
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	gameOver() {
		this.cleanGame();
		// this.explote();
		let gameOver = document.getElementById("gameOver");
		gameOver.style.display = "block";
	}

	finishGame() {
		this.cleanGame();
		let divWin = document.getElementById("win");
		divWin.style.display = "block";
	}
	/*
    explote() {
        let explote = document.createElement("div");
		explote.classList.add("explote");
		document.getElementById("contenedor").appendChild(this.explote);
    }
*/
	cleanGame() {
		let gameElements = document.getElementById("contenedor");
		gameElements.removeChild(this.nave.nave);
		clearInterval(this.loopEnemy);
		let div = document.getElementById("pyl");
		div.style.display = "none";
	}
}
