// 1. 불꽃놀이 함수 정의
const URL = "https://teachablemachine.withgoogle.com/models/x1wpJ0ba-/";

let model, webcam, labelContainer, maxPredictions;
let maxPredictionRate = 0.00;


// Load the image model and setup the webcam
async function init() {
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";

	// load the model and metadata
	// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
	// or files from your local hard drive
	// Note: the pose library adds "tmImage" object to your window (window.tmImage)
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	// Convenience function to setup a webcam
	const flip = true; // whether to flip the webcam
	webcam = new tmImage.Webcam(600, 600, flip); // width, height, flip
	await webcam.setup(); // request access to the webcam
	await webcam.play();
	window.requestAnimationFrame(loop);

	// append elements to the DOM
	document.getElementById("webcam-container").appendChild(webcam.canvas);
	labelContainer = document.getElementById("label-container");
	for (let i = 0; i < maxPredictions; i++) { // and class labels
		labelContainer.appendChild(document.createElement("div"));
	}
}

async function loop() {
	webcam.update(); // update the webcam frame await predict();
	predict();
	window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
let changed = 0;
let def = 0.00;

async function predict() {
	// predict can take in an image, video or canvas html element
	const prediction = await model.predict(webcam.canvas);

    var classPrediction =
        prediction[1].className + ": " + prediction[1].probability.toFixed(2);
    labelContainer.childNodes[0].innerHTML = classPrediction;
    if (prediction[1].probability.toFixed(2) > maxPredictionRate) {
        maxPredictionRate = prediction[1].probability.toFixed(2);
    }

    var classPrediction =
        prediction[0].className + ": " + prediction[0].probability.toFixed(2);
    labelContainer.childNodes[1].innerHTML = classPrediction;
    if (prediction[0].probability.toFixed(2) > maxPredictionRate) {
        maxPredictionRate = prediction[0].probability.toFixed(2);
    }

	if (prediction[1].probability.toFixed(2) != 1.00) {
		changed = 1;
		def = prediction[1].probability.toFixed(2);
	}
	if (changed > 0 && def == 0.99) {
		changed += 1;
	}
	console.log("def: ", def);
	if (changed > 1 && def == 0.99) {
		showFireworks();
	}
	if (changed > 5) {
		changed = 0;
	}
	def = 0;
}

function showFireworks() {
	console.log("fireworks");
	const fireworksContainer = document.getElementById('fireworks');
	const message = document.getElementById('message');
	message.style.display = 'block';
	const images = [
		"./assets/fireworks/fireworks.jpg"
		// 추가 이미지 파일 경로
	];
	// 2. 스무개의 이미지가 램덤위치에서 나오게 설정
	
	for (let i = 0; i < 20; i++) {
		const firework = document.createElement('div');
		firework.className = 'firework';
		firework.style.top = Math.random() * 100 + 'vh';
		firework.style.left = Math.random() * 100 + 'vw';
		firework.style.backgroundImage = `url(${images[0]})`;
		fireworksContainer.appendChild(firework);
		setTimeout (()=> firework.remove(), 3000);
	}
	setTimeout(() => {
		message.style.display = 'none';
	}, 4000);
}

// 3. 모든 체크박스가 체크되었을 때, showFireworks() 작동