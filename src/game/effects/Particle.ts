export class Particle {
  private x: number;
  private y: number;
  private velocityX: number;
  private velocityY: number;
  private life: number;
  private maxLife: number;
  private color: string;
  private size: number;

  constructor(x: number, y: number, angle: number, speed: number, color: string) {
    this.x = x;
    this.y = y;
    this.velocityX = Math.cos(angle * Math.PI / 180) * speed;
    this.velocityY = Math.sin(angle * Math.PI / 180) * speed;
    this.life = this.maxLife = Math.random() * 0.5 + 0.3;
    this.color = color;
    this.size = Math.random() * 3 + 1;
  }

  update(deltaTime: number) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;
    this.velocityY += 200 * deltaTime; // Gravity
    this.life -= deltaTime;
  }

  isAlive(): boolean {
    return this.life > 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}