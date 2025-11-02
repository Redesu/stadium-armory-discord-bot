import { Hero } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class HeroesService {
    private apiUrl: string;
    private apiToken: string;

    constructor() {
        this.apiUrl = process.env.API_URL || '';
        this.apiToken = process.env.API_TOKEN || '';
        if (!this.apiUrl) {
            throw new Error('API_URL is not defined');
        }
    }

    async getHero(hero: Partial<Hero>) {
        const queryString = buildQueryStrings(hero, ['image_url']);
        const url = `${this.apiUrl}/heroes${queryString}`;

        return fetch(url).then(response => response.json());
    }

    async addHero(hero: Hero) {
        const url = `${this.apiUrl}/heroes`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(hero)
        }).then(response => response.json());
    }

    async updateHero(hero: Partial<Hero>) {
        const url = `${this.apiUrl}/heroes`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(hero)
        }).then(response => response.json());
    }

}