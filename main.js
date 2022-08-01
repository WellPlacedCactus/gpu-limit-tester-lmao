
///////////////////////////////////////////////////////// FUNCTIONS

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rands = () => Math.random() < 0.5 ? -1 : 1;

///////////////////////////////////////////////////////// VARIABLES

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const mouse = {};
const parts = [];

//////////////////////////////////////////////////////// CHANGE THIS VARIABLE RIGHT HERE TO LIMIT TEST UR GPU, TRY ADDING A ZEROS :D

const THE_VARIABLE_TO_CHANGE = 10;

///////////////////////////////////////////////////////// LOOP

const loop = () => {
  
  /////////////////////////////////////////////////////// CLEAR

  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  /////////////////////////////////////////////////////// ADD

  if (mouse.down) {
    for (let i = 0; i < THE_VARIABLE_TO_CHANGE; i++) {
      parts.push({
        x: mouse.x,
        y: mouse.y - 50,
        r: 50,
        vx: randint(1, 5) * rands() * Math.random(),
        vy: -randint(10, 25) * Math.random(),
        h: 0
      });
    }
  }

  /////////////////////////////////////////////////////// CHANGE TITLE

  document.title = `gpu-limit-tester-lmao ${parts.length}`;

  /////////////////////////////////////////////////////// ITERATE

  for (let i = parts.length - 1; i >= 0; --i) {
    const p = parts[i];

    p.x += p.vx;
    p.y += p.vy;

    p.h += 1;
    p.r -= 1;

    c.beginPath();
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    c.closePath();
    c.fillStyle = `hsl(${p.h}, 100%, 50%)`;
    c.fill();

    if (p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height || p.r < 1) {
      parts.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
};

///////////////////////////////////////////////////////// EVENTS

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  requestAnimationFrame(loop);
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});