export function getRarityColor(rarity: string): number {
    const rarityColors: Record<string, number> = {
        'Common': 0x4CAF50,
        'Rare': 0x2196F3,
        'Epic': 0x9C27B0,
    }
    return rarityColors[rarity] ?? 0x5865F2;
}

export function getHeroRoleColor(heroRole: string): number {
    const colors: Record<string, number> = {
        'Tank': 0xFAA81A,
        'Damage': 0xFF4655,
        'Support': 0xAAFF80
    }
    return colors[heroRole] ?? 0x5865F2;
}
