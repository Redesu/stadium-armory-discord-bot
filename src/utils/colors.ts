export function getRarityColor(rarity: string): number {
  const rarityColors: Record<string, number> = {
    Common: 0x4caf50,
    Rare: 0x2196f3,
    Epic: 0x9c27b0,
  };
  return rarityColors[rarity] ?? 0x5865f2;
}

export function getHeroRoleColor(heroRole: string): number {
  const colors: Record<string, number> = {
    Tank: 0xfaa81a,
    Damage: 0xff4655,
    Support: 0xaaff80,
  };
  return colors[heroRole] ?? 0x5865f2;
}
