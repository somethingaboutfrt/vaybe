import { Sword } from '../weapons/Sword';

export class Player {
  x: number = 400;
  y: number = 300;
  width: number = 32;
  height: number = 32;
  velocityX: number = 0;
  velocityY: number = 0;
  speed: number = 200;
  jumpPower: number = 400;
  health: number = 100;
  maxHealth: number = 100;
  onGround: boolean = false;
  weapon: Sword;
  lastAttack: number = 0;
  facing: number = 1; // 1 for right, -1 for left

  constructor() {
    this.weapon = new Sword();
  }

  update(deltaTime: number, keys: Set<string>): void {
    // Handle input
    if (keys.has('a') || keys.has('ArrowLeft')) {
      this.velocityX = -this.speed;
      this.facing = -1;
    } else if (keys.has('d') || keys.has('ArrowRight')) {
      this.velocityX = this.speed;
      this.facing = 1;
    } else {
      this.velocityX = 0;
    }

    if ((keys.has('w') || keys.has('ArrowUp') || keys.has(' ')) && this.onGround) {
      this.velocityY = -this.jumpPower;
      this.onGround = false;
    }

    // Apply gravity
    this.velocityY += 800 * deltaTime;

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Simple ground collision
    if (this.y > 500) {
      this.y = 500;
      this.velocityY = 0;
      this.onGround = true;
    }

    // Keep player in bounds
    if (this.x < 0) this.x = 0;
    if (this.x > 800 - this.width) this.x = 800 - this.width;
  }

  attack(): void {
    const now = Date.now();
    if (now - this.lastAttack > this.weapon.cooldown) {
      this.weapon.attack(this.x, this.y, this.facing);
      this.lastAttack = now;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw player as a simple rectangle
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw health bar
    const barWidth = 40;
    const barHeight = 4;
    const healthPercent = this.health / this.maxHealth;
    
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(this.x - 4, this.y - 10, barWidth, barHeight);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(this.x - 4, this.y - 10, barWidth * healthPercent, barHeight);
  }
}