export class Level {
  width = 2000;
  height = 600;
  groundY = 500;
  
  private platforms: Array<{x: number, y: number, width: number, height: number}> = [];

  constructor() {
    this.generateLevel();
  }

  private generateLevel() {
    // Generate some platforms
    this.platforms = [
      { x: 300, y: 400, width: 100, height: 20 },
      { x: 500, y: 350, width: 80, height: 20 },
      { x: 700, y: 300, width: 120, height: 20 },
      { x: 900, y: 380, width: 100, height: 20 },
      { x: 1200, y: 320, width: 150, height: 20 },
      { x: 1400, y: 250, width: 100, height: 20 },
      { x: 1600, y: 400, width: 200, height: 20 },
    ];
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#16213e');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw ground
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

    // Draw ground details
    ctx.fillStyle = '#4b5563';
    for (let x = 0; x < this.width; x += 40) {
      ctx.fillRect(x, this.groundY, 2, this.height - this.groundY);
    }

    // Draw platforms
    ctx.fillStyle = '#6b7280';
    this.platforms.forEach(platform => {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Platform highlight
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(platform.x, platform.y, platform.width, 2);
      ctx.fillStyle = '#6b7280';
    });

    // Draw background elements
    this.drawBackgroundElements(ctx);
  }

  private drawBackgroundElements(ctx: CanvasRenderingContext2D) {
    // Draw some background pillars/structures
    ctx.fillStyle = '#1f2937';
    
    for (let i = 0; i < 8; i++) {
      const x = i * 250 + 100;
      const height = 150 + Math.sin(i) * 50;
      ctx.fillRect(x, this.groundY - height, 30, height);
      
      // Pillar top
      ctx.fillStyle = '#374151';
      ctx.fillRect(x - 5, this.groundY - height, 40, 15);
      ctx.fillStyle = '#1f2937';
    }
  }
}