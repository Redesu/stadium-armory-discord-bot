import { HeroesService } from "./heroesService";
import { ItemsService } from "./itemsService";
import { PowersService } from "./powerService";

export class ServiceManager {
    public hero: HeroesService;
    public item: ItemsService;
    public power: PowersService;

    constructor() {
        this.hero = new HeroesService();
        this.item = new ItemsService();
        this.power = new PowersService();
    }
}