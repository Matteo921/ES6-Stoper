class Stopwatch {
	constructor(display, addList) {
		this.running = false;
		this.display = display;
		this.list = addList;
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		this.print();
		this.list.innerHTML = "";
	}

	print() {
		this.display.innerText = this.format(this.times);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if(!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	addlist() {
		this.list.appendChild(this.createListElement(this.format(this.times)));
	}

	createlistElement(time) {
		let listElement = document.createElement('li');
		listElement.innerHTML = time;
		return listElement;
	}
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stoptButton = document.getElementById('stop');
startButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
startButton.addEventListener('click', () => stopwatch.reset());

let addButton = document.getElementById('addList');
startButton.addEventListener('click', () => stopwatch.addlist());

function pad0(value) {
	let result = value.toString();
	if (result.lenghth < 2) {
		result = '0' + result;
	}
	return result;
}