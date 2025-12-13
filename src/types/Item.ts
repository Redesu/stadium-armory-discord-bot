interface ItemStat {
  stat_type: string;
  stat_value: number;
  stat_unit: string;
  stat_modifier: string;
}

export interface Item {
  name: string;
  rarity: string;
  type: string;
  price: number;
  stats: ItemStat[];
  hero?: string;
  description?: string;
  image_url?: string;
}
