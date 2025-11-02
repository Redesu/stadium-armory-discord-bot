import { AxiosInstance } from "axios";
import { Hero } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class HeroesService {

    constructor(private apiClient: AxiosInstance) { }

    async getHero(hero: Partial<Hero>) {
        const queryString = buildQueryStrings(hero, ['image_url']);
        const data = await this.apiClient.get(`/heroes${queryString}`);
        if (data.status === 404) {
            return [];
        }
        return data.data;
    }

    async getHeroPowers(heroName: string) {
        const data = (await this.apiClient.get(`/heroes/${heroName}/powers`)).data;
        if (data.status === 404) {
            return [];
        }
        return data;
    }

    async getHeroItems(heroName: string) {
        const data = (await this.apiClient.get(`/heroes/${heroName}/items`)).data;
        if (data.status === 404) {
            return [];
        }
        return data;
    }

}