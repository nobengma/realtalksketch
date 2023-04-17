let scl = 50; //scale
let resolution = 0.002;
//let numPoints = 100;

//let radius = 100;
//let numRings = 40;

function setup() {
  createCanvas(400, 400);
  background(255);
  //stroke(0,6);
  noStroke();
  strokeWeight(1);
  //prints(width/2, height/2);
  //charcoalPrint(width/2, height/2,50);
  //prints(width / 2, height / 2, 45, 20, 100);
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.fillStyle = gradient;
}

function prints(centerX, centerY, radius, numRings, numPoints) {
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (a = 0; a < TWO_PI; a += TWO_PI / numPoints) {
      var x = centerX + r * cos(a);
      var y = centerY + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scl, scl);

      curveVertex(x + n, y + n);

      if (random() > 0.7) {
        endShape();
        beginShape();
      }
    }
    endShape(CLOSE);
  }
  // noLoop();
}

function charcoalPrint(centerX, centerY, w) {
  h = 1.2 * w;
  push();
  //fill(0, 6);
  //rotate(random(PI*2));
  //rotate(random(PI*2));
  ellipseWGrad(centerX, centerY, w, h);
  //ellipse(centerX, centerY, w, h);
  drawingContext.clip(); //after will be clipped
  stroke(255);
  //stroke(random(230, 245));
  strokeWeight(0.5);
  noFill();
  prints(centerX, centerY, h, 20, 100);
  pop(); //end clip
  //noFill();
  //ellipse(centerX,centerY,w,1.5*w);
}

function ellipseWGrad(centerX, centerY, w, h) {
  noStroke();
  push();
  radialGradient(
    centerX,
    centerY,
    random(w/3,w), //Start pX, pY, start circle radius
    centerX,
    centerY,
    w, //End pX, pY, End circle radius
    color(0, 0), //Start color
    color(0, 20) //End color
  );
  ellipse(centerX, centerY, w, h);
  pop();
}

function draw() {
  if (mouseIsPressed == true) {
    charcoalPrint(mouseX, mouseY, 50);
  }
}

function keyTyped() {
  if (key === "r") {
    clear();
  }
}
