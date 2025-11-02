import { Item } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class ItemsService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.API_URL || '';
        if (!this.apiUrl) {
            throw new Error('API_URL is not defined');
        }
    }

    async getItem(item: Partial<Item>) {
        const queryString = buildQueryStrings(item, ['image_url']);
        const url = `${this.apiUrl}/items${queryString}`;

        return fetch(url).then(response => response.json());
    }
}