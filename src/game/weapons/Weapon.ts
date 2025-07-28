export abstract class BaseWeapon {
  abstract name: string;
  abstract damage: number;
  abstract cooldown: number;
  abstract range: number;
  
  abstract attack(x: number, y: number, direction: number): void;
}

export { BaseWeapon }