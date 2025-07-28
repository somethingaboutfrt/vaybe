export class Enemy {
  x: number;
  y: number;
  width: number = 24;
  height: number = 24;
  health: number = 50;
  maxHealth: number = 50;
  speed: number = 50;
  direction: number = 1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(deltaTime: number, playerX: number): void {
    // Simple AI - move towards player
    if (playerX > this.x) {
      this.direction = 1;
      this.x += this.speed * deltaTime;
    } else {
      this.direction = -1;
      this.x -= this.speed * deltaTime;
    }

    // Keep enemy on ground
    this.y = 500;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw enemy as a red rectangle
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw health bar
    const barWidth = 30;
    const barHeight = 3;
    const healthPercent = this.health / this.maxHealth;
    
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(this.x - 3, this.y - 8, barWidth, barHeight);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(this.x - 3, this.y - 8, barWidth * healthPercent, barHeight);
  }
}