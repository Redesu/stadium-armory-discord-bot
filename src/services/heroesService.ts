import { Hero } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class HeroesService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.API_URL || '';
        if (!this.apiUrl) {
            throw new Error('API_URL is not defined');
        }
    }

    async getHero(hero: Partial<Hero>) {
        const queryString = buildQueryStrings(hero, ['image_url']);
        const url = `${this.apiUrl}/heroes${queryString}`;

        return fetch(url).then(response => response.json());
    }

    async getHeroPowers(heroName: string) {
        const url = `${this.apiUrl}/heroes/${heroName}/powers`;

        return fetch(url).then(response => response.json());
    }

    async getHeroItems(heroName: string) {
        const url = `${this.apiUrl}/heroes/${heroName}/items`;

        return fetch(url).then(response => response.json());
    }

}