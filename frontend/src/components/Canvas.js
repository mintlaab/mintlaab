import React from "react";
import P5Wrapper from "react-p5-wrapper";
import env from "react-dotenv";

function rnd(seed) {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  
  let result = (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000;
  return result;
}

function range(seed, min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return rnd(seed) * (max - min) + min;
}

function rangeFloor (seed, min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(range(seed, min, max));
}

function getArt(p5, hexHash, imageDimension) {

  let seed = parseInt(hexHash.slice(0, 16), 16);
  
  let lineColor;
  let lineLength;
  let rotateInner;
  let rotateOuter;
  let translateX;
  let translateY;
  let maxNumRibbons = 20;
  
  p5.colorMode(p5.HSB, 360, 100, 100, 100);
  p5.push();  
  
  // --- draw background ------------------------------
  
  p5.background(rangeFloor(seed, 0,360), rangeFloor(seed, 60,100), rangeFloor(seed, 80,100));
  
  // --- draw foreground ------------------------------
  
  for (let ribbonNum = 0; ribbonNum < maxNumRibbons; ribbonNum++) {
    p5.push();
    let lineColor = p5.color(rangeFloor(seed, 0,360), 100, 100, 15);
    let rotateInner = range(-1,1);
    let rotateOuter = range(-0.5,0.5);
    let translateX = range(-1,1);
    let translateY = range(-1,1);
    let lineLength = range(0.05, 0.8) * imageDimension;
    p5.stroke(lineColor);
    p5.strokeWeight(0.001 * imageDimension);
    p5.angleMode(p5.DEGREES);
    p5.translate(range(0,imageDimension),range(0,imageDimension));
    
    for (let i=0; i<imageDimension * 2; i++) {
      p5.push();
      p5.rotate(i * rotateInner);
      p5.line(0,0,0,lineLength);
      p5.pop();    
      p5.rotate(rotateOuter);
      p5.translate(translateX, translateY);
    }

    p5.pop(); 
  }
  
  let theData = p5.canvas.toDataURL();
  return theData;
}

function Canvas() {
  const sketch = (p5) => {

    p5.setup = () => {  
  
      let imageDimension = 600;
      p5.createCanvas(imageDimension, imageDimension);
      let hey = getArt(p5, "13881a3a8da2a04715130e56fadca333773603d0d6aabbdd63311ef721d1542d8", imageDimension);
      console.log(hey)

    };
  };

  return <P5Wrapper sketch={sketch} />;
}

export default Canvas;
