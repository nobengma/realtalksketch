let scl = 50; //scale
let resolution = 0.002;

let elRad;
let redPrint;
let redCharcoalGradStart;
let redCharcoalGradEnd;
let charcoalPrintCol;
let charcoalGradStart;
let charcoalGradEnd;
let table;
let numRows;
let numCols;
let printColor1;
let colorStart1;
let colorEnd1;

function preload() {
  table = loadTable("RTFC36_man_code_2022-12-07.csv", "csv", "header");
  highlights = loadTable("RTFC36_Highlights.csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 500);
  background(255);
  noStroke();
  strokeWeight(1);
  elRad = 30; //random(30, 100);
  redPrintStatic = color(240, 0, 0, 30);
  redPrint = color(240, 0, 0, 25);
  redCharcoalGradStart = color(255, 100, 100, 0);
  redCharcoalGradEndStatic = color(255, 100, 100, 200);
  redCharcoalGradEnd = color(255, 100, 100, 50);
  redCharcoalGradEnd = color(255, 100, 100, 50);
  
  bluePrintStatic = color(0, 0, 240, 30);
  bluePrint = color(0, 0, 240, 25);
  blueCharcoalGradStart = color(100, 100, 255, 0);
  blueCharcoalGradEnd = color(100, 100, 255, 50);
  blueCharcoalGradEndStatic = color(100, 100, 255, 200);
  
  charcoalPrintStatic = color (0,20);
  charcoalPrintCol = color(0, 6);
  charcoalGradStart = color(0, 0);
  charcoalGradEnd = color(0, 20);
  //charcoalPrint(width/2, height/2, elRad, 20, redPrint, redCharcoalGradStart, redCharcoalGradEnd);
  
  numHighlights = highlights.getRowCount();
  for(i = 0; i<numHighlights; i++) {
    //rect(x, y, w, h, [detailX], [detailY])
    highlight_start_x = float(table.get(i, "highlight_start_x"));
    highlight_end_x = float(table.get(i, "highlight_end_x"));
    rectMode(CORNER);
    //fill(color(230, 250, 222));
    noStroke();
    rect(highlight_start_x, 0, highlight_end_x - highlight_start_x, 500);
  }

  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  // print(table.get(1, "type_color"));
  // print(table.get(1, "start_x"));
  // print(table.get(1, "emphasis"));
  // print(table.get(1, "type_shape_h"));
  
  
  let printColor = charcoalPrintCol;
  let colorStart = charcoalGradStart;
  let colorEnd = charcoalGradEnd;
  for (i = 0; i < numRows; i++) {
    if (table.get(i, "type_color") === "BLACK") {
      printColor = charcoalPrintStatic;
      colorStart = charcoalGradStart;
      charcoalGradEnd.setAlpha(float(table.get(i, "engagement_alpha")));
      colorEnd = charcoalGradEnd;
    }
    if (table.get(i, "type_color") === "RED") {
      printColor = redPrintStatic;
      colorStart = redCharcoalGradStart;
      redCharcoalGradEndStatic.setAlpha(float(table.get(i, "engagement_alpha")));
      colorEnd = redCharcoalGradEndStatic;
    }
    else if (table.get(i, "type_color") === "BLUE") {
      printColor = bluePrintStatic;
      colorStart = blueCharcoalGradStart;
      blueCharcoalGradEndStatic.setAlpha(float(table.get(i, "engagement_alpha")));
      colorEnd = blueCharcoalGradEndStatic;
    }

    //charcoalPrint(centerX,centerY,w,h_coeff,fade,printColor,colorStart,colorEnd)
    drawingContext.filter = "blur(2px)";
    charcoalPrint(
      float(table.get(i, "start_x")),
      250,
      float(table.get(i, "emphasis")),
      float(table.get(i, "type_shape_h")),
      20,
      printColor,
      colorStart,
      colorEnd
    );
  }
  
  
  //for drawing
  printColor1 = color(0, 6);
  colorStart1 = color(0, 0);
  colorEnd1 = color(0, 20);
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

function charcoalPrint(
  centerX,
  centerY,
  w,
  h_coeff,
  fade,
  printColor,
  colorStart,
  colorEnd
) {
  this.x = centerX;
  this.y = centerY;
  this.w = w;

  h = h_coeff * w;
  push();
  ellipseWGrad(centerX, centerY, w, h, fade, colorStart, colorEnd);
  drawingContext.clip(); //after will be clipped
  stroke(printColor);
  strokeWeight(1);
  noFill();
  prints(centerX, centerY, h, w * 0.6, 100);
  pop(); //end clip
}

function ellipseWGrad(centerX, centerY, w, h, fade, colorStart, colorEnd) {
  noStroke();
  push();
  radialGradient(
    centerX,
    centerY,
    w / 4, //Start pX, pY, start circle radius
    centerX,
    centerY,
    w, //End pX, pY, End circle radius
    colorStart, //Start color
    colorEnd //End color
  );
  ellipse(centerX, centerY, w, h);
  pop();
}

function draw() {
  if (mouseIsPressed == true) {
    drawingContext.filter = "blur(0px)";
    fade = 20;
    charcoalPrint(
      mouseX,
      mouseY,
      elRad,
      0.9,
      fade,
      printColor1,
      colorStart1,
      colorEnd1
      // redPrint,
      // redCharcoalGradStart,
      // redCharcoalGradEnd
    );
    fade -= 0.5;
  }
}

function keyTyped() {
  if (key === "r") {
    clear();
  }
  if (key === "[") {
    elRad -= 10;
  }
  if (key === "]") {
    elRad += 10;
  }
  if (key === "q") {
    printColor1 = redPrint;
    colorStart1 = redCharcoalGradStart;
    colorEnd = redCharcoalGradEnd;
  }
  if (key === "w") {
    printColor1 = bluePrint;
    colorStart1 = blueCharcoalGradStart;
    colorEnd1 = blueCharcoalGradEnd;
  }
  if (key === "e") {
    printColor1 = charcoalPrintCol;
    colorStart1 = charcoalGradStart;
    colorEnd1 = charcoalGradEnd;
  }
  if (keyCode === RETURN) {
    saveCanvas("printTest", "png");
  }
}
