const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: -1000, y: -1000 }; // 초기 마우스 위치는 멀리

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = 10 + Math.random() * 10;
    this.speed = 2 + Math.random() * 4;
    this.drift = 0;
  }

  update() {
    // 마우스와 가까우면 비를 피함
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      this.drift = dx / distance * 5;
    } else {
      this.drift *= 0.95;
    }

    this.y += this.speed;
    this.x += this.drift;

    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(135, 206, 235, 0.6)";
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.drift, this.y + this.length);
    ctx.stroke();
  }
}

let drops = [];
for (let i = 0; i < 300; i++) {
  drops.push(new Raindrop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let drop of drops) {
    drop.update();
    drop.draw();
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
