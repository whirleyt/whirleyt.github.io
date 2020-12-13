let bubbles = [];
let bubbleNum = 10;
let vx = 0;
let vy = 0;
let t = 10;


function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < bubbleNum; i++) {
    //add bubble object to array
    bubbles.push(new bubble(width / 2, height / 2, random(2, 10), random(-2, 2), random(-2, 2)));
  }

}

function draw() {
  background(255);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].checkEdge();
    // remove bubble from array
    if (bubbles[i].contains(vx, vy) == true) {
      bubbles.splice(i, 1);
    }
  }
  // move the bubble popper using keyboard
  if (keyIsDown(LEFT_ARROW)) {
    vx -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    vx += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    vy -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    vy += 5;
  }
  // bubble popper
  fill('black');
  noStroke();
  circle(vx, vy, 20)
  // time and score
  textAlign(CENTER);
  let score = bubbleNum - bubbles.length;
  if (frameCount % 60 == 0 && t > 0) {
    t--;
  }
  if (score == bubbleNum) {
    text("YOU WON!", width / 2, height / 2);
  } else if (t == 0) {
    text("Game Over", width / 2, height / 2);
    text(score + "/" + bubbleNum, width / 2, height / 2 - 40);
  }
  text(t, width / 2, 30);
  textSize(20);

}



class bubble {
  constructor() {
    this.speed = createVector(random(-2, 2), random(-2, 2));
    this.x = random(width);
    this.y = random(height);
    this.radius = random(20);
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }
  move() {
    this.x = this.x + this.speed.x;
    this.y = this.y + this.speed.y;
  }
  show() {
    fill(this.color);
    circle(this.x, this.y, this.radius * 2)

  }
  // so bubble does not leave canvas
  // reverse speed
  checkEdge() {
    if (this.x > width || this.x < 0) {
      this.speed.x = -this.speed.x;

    }
    if (this.y > width || this.y < 0) {
      this.speed.y = -this.speed.y;

    }
  }
  // distance between bubble and popper
  contains(x2, y2) {
    let d = dist(x2, y2, this.x, this.y);
    if (d < 20) {
      return true;
    } else {
      return false;
    }
  }

}