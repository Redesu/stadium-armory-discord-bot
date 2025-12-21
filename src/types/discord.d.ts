import { ServiceManager } from "../services/ServicesManager";

declare module "discord.js" {
  export interface Client {
    services: ServiceManager;
  }
}
