import { Player } from './entities/Player';
import { Enemy } from './entities/Enemy';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  enemies: Enemy[] = [];
  keys: Set<string> = new Set();
  lastTime: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  enemySpawnTimer: number = 0;
  enemySpawnInterval: number = 3000; // 3 seconds

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.player = new Player();
    
    // Create some enemies
    this.enemies.push(new Enemy(100, 500));
    this.enemies.push(new Enemy(600, 500));
    this.enemies.push(new Enemy(300, 500));

    this.setupEventListeners();
    this.gameLoop(0);
  }

  setupEventListeners(): void {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
      if (e.key === ' ') e.preventDefault();
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });

    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener('click', () => {
      this.player.attack(this.enemies);
    });
  }

  gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  update(deltaTime: number): void {
    this.player.update(deltaTime, this.keys);
    
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime, this.player.x);
    });

    // Remove dead enemies
    this.enemies = this.enemies.filter(enemy => !enemy.isDead);

    // Spawn new enemies
    this.enemySpawnTimer += deltaTime * 1000;
    if (this.enemySpawnTimer >= this.enemySpawnInterval) {
      this.spawnEnemy();
      this.enemySpawnTimer = 0;
    }
  }

  spawnEnemy(): void {
    // Randomly spawn from left or right side
    const spawnFromLeft = Math.random() < 0.5;
    const spawnX = spawnFromLeft ? -50 : this.canvas.width + 50;
    const spawnY = 500;
    
    this.enemies.push(new Enemy(spawnX, spawnY));
  }

  render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ground
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, 524, this.canvas.width, this.canvas.height - 524);

    // Draw entities
    this.player.render(this.ctx);
    this.enemies.forEach(enemy => enemy.render(this.ctx));

    // Draw UI
    this.drawUI();
  }

  drawUI(): void {
    // Draw instructions
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText('WASD/Arrow Keys: Move', 10, 30);
    this.ctx.fillText('Space: Jump', 10, 50);
    this.ctx.fillText('Click: Attack', 10, 70);
    
    // Draw weapon info
    this.ctx.fillText(`Weapon: ${this.player.weapon.name}`, 10, 100);
    this.ctx.fillText(`Damage: ${this.player.weapon.damage}`, 10, 120);
  }
}