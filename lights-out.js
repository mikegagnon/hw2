class LightsOut {
	constructor(gameId) {
		this.gameId = gameId;
		this.numRows = 4;
		this.numCols = 4;
		this.registerClicks();
		this.randomize();

	}

	randomize() {
		for (let r = 0; r < this.numRows; r++) {
			for (let c = 0; c < this.numCols; c++) {
				const div = document.querySelector(`#${this.gameId} [data-row="${r}"][data-col="${c}"]`);
				const state = Math.random() < 0.5;
				div.dataset.state = state ? "on" : "off";
				div.classList.toggle("on", state);
			}
		}
	}

	getNeighbors(row, col) {
		const neighbors = [];
		if (row > 0) neighbors.push([row - 1, col]);
		else neighbors.push([this.numRows - 1, col]); 
		if (row < this.numRows - 1) neighbors.push([row + 1, col]);
		else neighbors.push([0, col]);
		if (col > 0) neighbors.push([row, col - 1]);
		else neighbors.push([row, this.numCols - 1]);
		if (col < this.numCols - 1) neighbors.push([row, col + 1]);
		else neighbors.push([row, 0]);
		return neighbors;
	}

	// register click handlers
	registerClicks() {
		document.querySelectorAll(`#${this.gameId} .button`).forEach(button => {
			button.addEventListener("click", () => {
				const row = parseInt(button.dataset.row, 10);
				const col = parseInt(button.dataset.col, 10);
				const neighbors = this.getNeighbors(row, col);
				neighbors.forEach(neighbor => {
					const [nRow, nCol] = neighbor;	
					const neighborButton = document.querySelector(`#${this.gameId} [data-row="${nRow}"][data-col="${nCol}"]`);
					neighborButton.classList.toggle("on");
				});
				button.classList.toggle("on");
			});
		});
	}

}