export class Player {
  private hp: number;
  private skill_strength: number;
  constructor(hp: number, skill_strength: number) {
    this.hp = hp || 100;
    this.skill_strength = skill_strength;
  }
  getHP() {
    return this.hp;
  }
  attack(boss: Boss) {
    boss.injure(this.skill_strength);
  }
  injure(skill_strength: number) {
    this.hp = this.hp - skill_strength;
  }
}

export class Boss {
  private hp: number;
  private skill_strength: number;
  constructor(hp: number, skill_strength: number) {
    this.hp = hp || 100;
    this.skill_strength = skill_strength;
  }
  getHP() {
    return this.hp;
  }

  attack(player: Player) {
    player.injure(this.skill_strength);
  }

  injure(skill_strength: number) {
    this.hp = this.hp - skill_strength;
  }
}
