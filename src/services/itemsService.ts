import { Item } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class ItemsService {
    private apiUrl: string;
    private apiToken: string;

    constructor() {
        this.apiUrl = process.env.API_URL || '';
        this.apiToken = process.env.API_TOKEN || '';
        if (!this.apiUrl) {
            throw new Error('API_URL is not defined');
        }
    }

    async getItem(item: Partial<Item>) {
        const queryString = buildQueryStrings(item, ['image_url']);
        const url = `${this.apiUrl}/items${queryString}`;

        return fetch(url).then(response => response.json());
    }

    async addItem(item: Item) {
        const url = `${this.apiUrl}/items`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(item)
        }).then(response => response.json());
    }

    async updateItem(item: Partial<Item>) {
        const url = `${this.apiUrl}/items`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(item)
        }).then(response => response.json());
    }

}