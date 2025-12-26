import axios, { AxiosInstance } from "axios";
import { HeroesService } from "./heroesService";
import { ItemsService } from "./itemsService";
import { PowersService } from "./powerService";
import { SearchService } from "./searchService";

export class ServiceManager {
  public hero: HeroesService;
  public item: ItemsService;
  public power: PowersService;
  public search: SearchService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status < 500,
      timeout: 10000,
    });

    this.hero = new HeroesService(this.apiClient);
    this.item = new ItemsService(this.apiClient);
    this.power = new PowersService(this.apiClient);
    this.search = new SearchService(this.apiClient);
  }
}
