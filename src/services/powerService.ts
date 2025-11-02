import { Power } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class PowersService {
    private apiUrl: string;
    private apiToken: string;

    constructor() {
        this.apiUrl = process.env.API_URL || '';
        this.apiToken = process.env.API_TOKEN || '';
        if (!this.apiUrl) {
            throw new Error('API_URL is not defined');
        }
    }

    async getPower(power: Partial<Power>) {
        const queryString = buildQueryStrings(power, ['image_url']);
        const url = `${this.apiUrl}/powers${queryString}`;

        return fetch(url).then(response => response.json());
    }

    async addPower(power: Power) {
        const url = `${this.apiUrl}/powers`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(power)
        }).then(response => response.json());
    }

    async updatePower(power: Partial<Power>) {
        const url = `${this.apiUrl}/powers`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiToken}`
            },
            body: JSON.stringify(power)
        }).then(response => response.json());
    }

}