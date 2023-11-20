title = "SQUIRCLE TAP";

description = `
   TAP THE SQUARE
   WHEN THE
   OUTER CIRCLE
   TOUCHES IT
`;
  
characters = [];

const G = {
  WIDTH: 100,
  HEIGHT: 100,
  RADIUS: 10
}
 
options = {
  viewSize: {x:G.WIDTH, y: G.HEIGHT}
};

let squares;
let posX;
let posY;
let ring;
let decreaseSize;

function update() {
  if (!ticks) {
    play("select");
    squares = [];
    for(let i = 0; i < 5; i++) {
      posX = rnd(G.RADIUS + 5, G.WIDTH - G.RADIUS + 5);
      posY = rnd(G.RADIUS + 5, G.HEIGHT - G.RADIUS + 5);
      squares.push ({
        sqPos: vec(posX - (G.RADIUS/2), posY - (G.RADIUS/2)),
        ringPos: vec(posX, posY),
        blockSize: G.RADIUS,
        ringSize: G.RADIUS + 10
      })
    }
    decreaseSize = 0;
  }

  color('red');
  rect(squares[1].sqPos, squares[1].blockSize);
  color('black');
  ring = arc(squares[1].ringPos, squares[1].ringSize - decreaseSize); 
  decreaseSize += 0.1 + (difficulty * 0.2)

  remove(squares, (sq) => { 
    if(input.isJustPressed && ring.isColliding.rect.red && input.pos.x >= sq.sqPos.x - G.RADIUS && input.pos.x <= sq.sqPos.x + G.RADIUS && input.pos.y >= sq.sqPos.y - G.RADIUS && input.pos.y <= sq.sqPos.y + G.RADIUS) {
      addScore(1);
      particle(sq.sqPos);
      posX = rnd(G.RADIUS + 5, G.WIDTH - G.RADIUS + 5);
      posY = rnd(G.RADIUS + 5, G.HEIGHT - G.RADIUS + 5);
      squares.push ({
        sqPos: vec(posX - (G.RADIUS/2), posY - (G.RADIUS/2)),
        ringPos: vec(posX, posY),
        blockSize: G.RADIUS,
        ringSize: G.RADIUS + 10
      })
      decreaseSize = 0;
      return ring.isColliding.rect.red;
    }
  })

  if (decreaseSize > G.RADIUS + 10) {
    end("Game Over");
  }
}
