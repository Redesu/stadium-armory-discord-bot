export interface Item {
    rarity: string;
    hero?: string;
    name: string;
    stat_modifier: string;
    stat_value: number;
    stat_unit: string;
    stat_type: string;
    type: string;
    description: string;
    price: number;
    image_url?: string;
    hero_id?: number;
}