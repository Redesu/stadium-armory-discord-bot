import { AxiosInstance } from "axios";

export class SearchService {
  constructor(private apiClient: AxiosInstance) {}

  async search(query: string) {
    const querySearch = encodeURIComponent(query);
    const data = await this.apiClient.get(`/search?term=${querySearch}`);
    if (data.status === 404) {
      return [];
    }
    return data.data;
  }
}
