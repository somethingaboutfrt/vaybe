import React, { useEffect, useRef } from 'react';
import { Game } from './game/Game';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new Game(canvasRef.current);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Dead Cells Inspired Game</h1>
        <p className="text-gray-300 mb-6">A 2D action platformer with roguelike elements</p>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-gray-600 rounded-lg shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="mt-4 text-gray-400 text-sm">
          <p>Use WASD or Arrow Keys to move • Space to jump • Click to attack</p>
        </div>
      </div>
    </div>
  );
}

export default App;