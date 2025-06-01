const typewriterElement = document.getElementById("typewriter");
const words = [
  "Developer| ",
  "Programmer| "
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 200;
let pauseBetweenWords = 0;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex--);
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, pauseBetweenWords);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : typingSpeed);
  }
}

type();


// Particle Effect
const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.opacity = 1;
      this.color = `rgba(100, 149, 237, ${this.opacity})`; // cornflower blue
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.02;
      this.color = `rgba(100, 149, 237, ${this.opacity})`;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let particles = [];

  const mouse = {
    x: null,
    y: null
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.opacity <= 0) {
        particles.splice(i, 1);
      } else {
        p.draw();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();