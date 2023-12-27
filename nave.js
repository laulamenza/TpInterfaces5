"use strict";

class Nave {
	constructor() {
		this.nave = document.createElement("div");
		this.nave.classList.add("nave");
		document.getElementById("contenedor").appendChild(this.nave);
	}

	status() {
		return this.nave.getBoundingClientRect();
	}

	elevar() {
		this.clean();
		this.nave.classList.add("elevar");
	}
	caer() {
		this.clean();
		if (this.nave.classList == "elevar") {
			this.nave.classList.add("caer");
		}
	}

	clean() {
		this.nave.classList.remove("elevar");
		this.nave.classList.remove("caer");
		this.nave.removeEventListener("animationend", () => {});
	}
}
