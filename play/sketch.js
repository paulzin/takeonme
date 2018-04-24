var osc, envelope, fft;

var scaleArray = [66, 66, 62, 59, 59, 64, 64, 64, 68, 68, 69,
	 71, 69, 69, 69, 66, 62, 66, 66, 66, 64, 64, 66, 64];
var note = 0;

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  osc = new p5.SawOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0, 0.2, 0.1, 0);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

	osc.freq(0);
  osc.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background("#009688");

	textFont('monospace');

	textSize(42);
	fill(255);
	text('take on me', 10, 40);

	textSize(16);
	fill("#B2DFDB");
	text('press\nany\nkey\nor\ntouch\nthe\nscreen', 10, 65);

	if (mouseIsPressed || keyIsPressed) {
		background("#FFCC80");
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	playNote();
}

function mousePressed() {
	playNote();
	return false;
}

function touchStarted() {
  	return false;
}

function playNote() {
	var midiValue = scaleArray[note];
	var freqValue = midiToFreq(midiValue);
	osc.freq(freqValue);

	envelope.play(osc, 0, 0.2);
	note = (note + 1) % scaleArray.length;
}
