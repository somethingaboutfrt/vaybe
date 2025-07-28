import { BaseWeapon } from './Weapon';

export class Sword extends BaseWeapon {
  name = 'Sword';
  damage = 25;
  cooldown = 500;
  range = 50;
  
  attack(x: number, y: number, direction: number): void {
    // Create sword attack effect
    console.log(`Sword attack at ${x}, ${y} facing ${direction}`);
  }
}