let video;
let invertedFrame;
let timeBuffer = []; // Buffer to hold previous frames for time delay
let delayFrames = 30; // Number of frames for the delay (adjustable)

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Create an inverted frame buffer
  invertedFrame = createImage(width, height);
}

function draw() {
  background(0);

  // Load the current video frame
  video.loadPixels();

  // Create the inverted frame
  invertedFrame.loadPixels();
  for (let i = 0; i < video.pixels.length; i += 4) {
    invertedFrame.pixels[i] = 255 - video.pixels[i];     // Red
    invertedFrame.pixels[i + 1] = 255 - video.pixels[i + 1]; // Green
    invertedFrame.pixels[i + 2] = 255 - video.pixels[i + 2]; // Blue
    invertedFrame.pixels[i + 3] = 255; // Alpha (fully opaque)
  }
  invertedFrame.updatePixels();

  // Add current frame to the buffer
  timeBuffer.push(invertedFrame.get());

  // Limit the buffer size to the desired delay
  if (timeBuffer.length > delayFrames) {
    timeBuffer.shift();
  }

  // Draw the original video flipped horizontally
  push();
  translate(width, 0); // Move the origin to the right edge
  scale(-1, 1); // Flip the x-axis
  tint(255, 255); // Fully opaque
  image(video, 0, 0, width, height);
  pop();

  // Draw the delayed, inverted video flipped horizontally
  if (timeBuffer.length === delayFrames) {
    push();
    translate(width, 0); // Move the origin to the right edge
    scale(-1, 1); // Flip the x-axis
    tint(255, 127); // 50% transparency
    image(timeBuffer[0], 0, 0, width, height);
    pop();
  }

  // // Add a reflective message
  // fill(255, 255, 255, 200); // White color with transparency
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // text("מי אתה באמת? זיכרון מעוות, או השתקפות?", width / 2, height - 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}