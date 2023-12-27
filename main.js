"use strict";

let game = null;
let menu = document.getElementById("menu");
let controls = document.getElementById("contr");
let gameOver = document.getElementById("gameOver");
let music = new Audio("music/music.mp3");
let win = document.getElementById("irMenu");

/***********************************************
 *            ESCUCHA DE EVENTOS
 *            ******************
 */

document.getElementById("play").addEventListener("click", (e) => {
	menu.style.display = "none";
	game = new Game();
	game.start();
});

document.getElementById("controls").addEventListener("click", (e) => {
	menu.style.display = "none";
	controls.style.display = "block";
});

document.getElementById("music").addEventListener("click", (e) => {
	music.play();
});

document.getElementById("volver").addEventListener("click", (e) => {
	menu.style.display = "block";
	controls.style.display = "none";
});

document.getElementById("irMenu").addEventListener("click", (e) => {
	menu.style.display = "block";
	controls.style.display = "none";
	win.style.display = "none";
});

document.getElementById("restart").addEventListener("click", (e) => {
	menu.style.display = "block";
	controls.style.display = "none";
	gameOver.style.display = "none";
});

/*
 *           CONTROLES DE LA NAVE
 *           ********************
 */
document.addEventListener("keydown", (e) => {
	if (game != null) {
		switch (e.key) {
			case "ArrowUp":
				game.elevar();
				break;
			case "ArrowDown":
				game.caer();
				break;
			default:
				break;
		}
	}
});
