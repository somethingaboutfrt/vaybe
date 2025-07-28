export class InputManager {
  private keys: Set<string> = new Set();
  private mousePressed = false;
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
    });

    document.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    document.addEventListener('mousedown', (e) => {
      this.mousePressed = true;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      this.mousePressed = false;
    });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  isKeyPressed(keyCode: string): boolean {
    return this.keys.has(keyCode);
  }

  isAttacking(): boolean {
    return this.mousePressed;
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }
}