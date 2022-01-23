let grid = { 
	selectedBlocks: [],
	getNeighbours: function (blockID) {
		let neighbours = 0;
		let directions = [
			1, -1, 
			-this.width, 
			-this.width - 1, 
			-this.width + 1, 
			this.width, 
			this.width - 1, 
			this.width + 1
		];
		for (let i in directions) {
			if (this.selectedBlocks.includes(blockID + directions[i])) {
				neighbours++;
			}
		}
		return neighbours;
	},
	killBlock: function (blockID) {
		this.selectedBlocks.splice(this.selectedBlocks.indexOf(blockID), 1);
		document.querySelector("#block-" + blockID).className = "grid-block";
	},
	addBlock: function (blockID) {
		this.selectedBlocks.push (blockID);
		document.querySelector ("#block-" + blockID).className = "grid-block selected-block";
	},
	updateGrid: function () {
		for (let i = 0; i < (this.width * this.height); i++) {
			if (this.selectedBlocks.includes (i)) {
				document.querySelector ("#block-" + i).className = "grid-block selected-block";
			} else {
				document.querySelector("#block-" + i).className = "grid-block";
			}
		}
	}
};

function gridSizeInput (barID) {
	document.querySelector("#label-" + barID).innerHTML = 
		"Grid " + ["Height", "Width"][barID - 1] + ": " + 
		document.querySelector("#grid-size-" + barID).value + " Blocks";
}

function onBlockClicked (blockID) {
	if (grid.selectedBlocks.includes (blockID)) {
		grid.killBlock (blockID);
	} else {
		grid.addBlock (blockID);
	}
}

function createGrid () {
	let gridSize = [document.querySelector("#grid-size-1").value, 
					document.querySelector("#grid-size-2").value];

	grid.height = parseInt (gridSize[0]);
	grid.width = parseInt (gridSize[1]);

	document.body.removeChild (document.querySelector (".start-menu"));
	document.body.className = "";

	var gridContainer = document.createElement("div");
	gridContainer.className = "grid-container";
	document.body.appendChild(gridContainer);

	gridContainer.style.gridTemplateRows =  "repeat("+ gridSize[0] +", 50px)";
	gridContainer.style.gridTemplateColumns = "repeat("+ gridSize[1] +", 50px)";

	for (let i = 0; i < parseInt (gridSize[0]) * parseInt (gridSize[1]); i++) {
		var gridBlock = document.createElement ("div");
		gridBlock.className = "grid-block";
		gridBlock.id = "block-" + i;
		gridContainer.appendChild(gridBlock);
		gridBlock.setAttribute ("onclick", "onBlockClicked(" + i + ")");
	}

	controlMenu = document.createElement("div");
	controlMenu.className = "control-menu";

	startButton = document.createElement("button");
	startButton.className = "control-start-button";
	startButton.innerHTML = "Start";
	// startButton.setAttribute("onclick", "setInterval(startGame, 500)");
	startButton.setAttribute("onclick", "startGame()");

	controlMenu.appendChild(startButton);
	document.body.appendChild(controlMenu);

}

function startGame () {
	let newSelectedBlocks = [...grid.selectedBlocks];
	for (let i = 0; i < (grid.width * grid.height); i++) {
		if (grid.selectedBlocks.includes (i)) {
			if (grid.getNeighbours(i) < 2 || grid.getNeighbours(i) > 3) {
				newSelectedBlocks.splice(newSelectedBlocks.indexOf(i), 1);
			}
		} else {
			if (grid.getNeighbours(i) == 3) {
				newSelectedBlocks.push(i);
			}
		}
	}
	grid.selectedBlocks = newSelectedBlocks;
	grid.updateGrid ();
}