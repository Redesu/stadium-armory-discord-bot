import { AxiosInstance } from "axios";
import { Power } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class PowersService {

    constructor(private apiClient: AxiosInstance) { }

    async getPower(power: Partial<Power>) {
        const queryString = buildQueryStrings(power, ['image_url'])
        const data = await this.apiClient.get(`/powers${queryString}&image_url=true`);
        if (data.status === 404) {
            return [];
        }
        return data.data;
    }
}