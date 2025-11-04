export function sanitizeFileName(name: string): string {
    return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
}


export function base64ImageToBuffer(base64Image: string): Buffer {
    return Buffer.from(base64Image.split('base64,')[1], 'base64');
}