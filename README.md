# Stadium Armory

A discord bot for [Overwatch Stadium](https://overwatch.blizzard.com/news/24188046/) using [discord.js](https://discord.js.org/#/) and [node.js](https://nodejs.org/en/). It uses [ow-stadium-api](https://github.com/Redesu/ow-stadium-api) as a data source. Use `/help` to see all available commands.

-----

## You can invite the bot [HERE](https://discord.com/oauth2/authorize?client_id=1434270244523872276&scope=bot&permissions=51200)


## Features

- Show information about a hero, power, or item
- Search for a hero, power, or item using custom filters
- List all heroes, powers, or items by role, rarity, or price

-----

## Project Structure

```
.
├── src/
│   ├── commands/          # Discord commands
│   ├── components/        # Custom components (navigation buttons, etc.)
│   ├── embeds/            # Embed creators and handlers
│   ├── services/          # Services for fetching data from the API
│   ├── types/             # Types for the bot
│   ├── utils/             # Utility functions
│   ├── deploy-commands.ts # Script for deploying commands 
│   └── index.ts           # Main entry point
```

-----

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (or yarn, pnpm, bun)
- **discord.js** (v14+)
- **ow-stadium-api** (see [README](https://github.com/Redesu/ow-stadium-api))

-----

## Installation

### 1\. Clone the repository

```sh
git clone https://github.com/Redesu/stadium-armory-discord-bot.git
```

### 2\. Install dependencies

```sh
cd stadium-armory-discord-bot
npm install
```

### 3\. Create a `.env` file in the root of the project

Create a `.env` file in the root of the project. You can copy `.env.example` if it exists, or create it manually:

```sh
cp .env.example .env
```

**Required Environment Variables (`.env`):**

```
# Discord
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_bot_client_id

# API
API_URL=your_api_url (e.g., https://ow-stadium-api.redesu.com.br/api)
```

### 4\. Run the bot in development or production

```sh
npm run dev
npm run start
```

### 5\. Deploy commands

```sh
npm run deploy
```

-----

## Contributing

Pull requests are welcome\! For major changes, please open an issue first to discuss what you would like to change or add.
If you find wrong information, please open an issue or contact me on Discord (@redesu) or join the [support server](https://discord.gg/W2DnRxU9).