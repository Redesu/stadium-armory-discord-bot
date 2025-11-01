import fs from 'fs';
import path from 'path';

export default function findCommandFiles(dir: string): string[] {
    let files: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const itemPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            files = files.concat(findCommandFiles(itemPath));
        } else if (item.isFile() && item.name.endsWith('.ts')) {
            files.push(itemPath);
        }
    }
    return files;
}