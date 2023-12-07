function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);

  grass_Height = 200;
  ground_Top = height - grass_Height;
  jump_Height = height/12;
}



function draw() {
  // call function
    game();
    drawPlatform(950, (ground_Top - (jump_Height * 3) + 5), 130, 10, "#E79548");
    drawPlatform(750, (ground_Top - (jump_Height * 2) + 5), 130, 10, "#E79548");
    drawPlatform(550, (ground_Top - (jump_Height * 1) + 5), 130, 10, "#E79548");
    displayPlayer();
    keyPressed();
}
