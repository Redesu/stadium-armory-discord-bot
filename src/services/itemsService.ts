import { AxiosInstance } from "axios";
import { Item } from "../types";
import buildQueryStrings from "../utils/buildQueryString";

export class ItemsService {
  constructor(private apiClient: AxiosInstance) {}

  async getItem(item: Partial<Item>) {
    const queryString = buildQueryStrings(item, ["image_url"]);
    const data = await this.apiClient.get(
      `/items${queryString}&image_url=true`,
    );
    if (data.status === 404) {
      return [];
    }
    return data.data;
  }
}
