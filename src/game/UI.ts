import { Player } from './entities/Player';

export class UI {
  render(ctx: CanvasRenderingContext2D, player: Player, enemyCount: number) {
    // Save context
    ctx.save();
    
    // Draw player health bar
    const healthBarWidth = 200;
    const healthBarHeight = 20;
    const healthBarX = 20;
    const healthBarY = 20;
    
    // Health bar background
    ctx.fillStyle = '#333';
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    
    // Health bar fill
    ctx.fillStyle = '#4ade80';
    const healthPercent = player.health / player.maxHealth;
    ctx.fillRect(healthBarX, healthBarY, healthBarWidth * healthPercent, healthBarHeight);
    
    // Health bar border
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.strokeRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    
    // Health text
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText(`HP: ${player.health}/${player.maxHealth}`, healthBarX + 5, healthBarY + 15);

    // Enemy counter
    ctx.fillStyle = '#fff';
    ctx.font = '18px monospace';
    ctx.fillText(`Enemies Alive: ${enemyCount}`, 20, 70);

    // Game title
    ctx.fillStyle = '#4a90e2';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('DEAD CELLS', ctx.canvas.width - 200, 30);

    // Instructions
    ctx.fillStyle = '#aaa';
    ctx.font = '12px monospace';
    ctx.fillText('WASD/Arrows: Move', ctx.canvas.width - 180, ctx.canvas.height - 60);
    ctx.fillText('SPACE: Jump', ctx.canvas.width - 180, ctx.canvas.height - 45);
    ctx.fillText('Mouse: Attack', ctx.canvas.width - 180, ctx.canvas.height - 30);

    // Restore context
    ctx.restore();
  }
}