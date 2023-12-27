"use strict";

class Enemy {
	constructor() {
		this.enemy = document.createElement("div");
		this.enemy.classList.add("enemigo");
		document.getElementById("contenedor").appendChild(this.enemy);
	}

	status() {
		return this.enemy.getBoundingClientRect();
	}
}
