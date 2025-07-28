export class Camera {
  x = 0;
  y = 0;
  
  private targetX = 0;
  private targetY = 0;
  private followSpeed = 5;
  
  constructor(private screenWidth: number, private screenHeight: number) {}

  follow(targetX: number, targetY: number) {
    this.targetX = targetX - this.screenWidth / 2;
    this.targetY = targetY - this.screenHeight / 2;
  }

  update(deltaTime: number) {
    // Smooth camera following
    this.x += (this.targetX - this.x) * this.followSpeed * deltaTime;
    this.y += (this.targetY - this.y) * this.followSpeed * deltaTime;
  }

  apply(ctx: CanvasRenderingContext2D) {
    ctx.translate(-this.x, -this.y);
  }
}