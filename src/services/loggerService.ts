import fs from "fs";
import path from "path";

export class LoggerService {
  private logDir: string;

  constructor(logDir = "./logs") {
    this.logDir = logDir;
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getLogFile(type: string) {
    const date = new Date().toISOString().split("T")[0];
    return path.join(this.logDir, `${type}-${date}.log`);
  }

  private writeLog(type: string, data: object) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${JSON.stringify(data)}\n`;
    fs.appendFileSync(this.getLogFile(type), logEntry);
  }

  logCommand(userId: string, guildId: string, commandName: string) {
    this.writeLog("commands", {
      userId,
      guildId,
      commandName,
      timestamp: Date.now(),
    });
  }
}
