import { readFile, writeFile } from 'fs/promises';

export class FileStorage {
  constructor (private readonly filePath: string) {
    if (!filePath.endsWith('.json')) {
      throw new Error('File storage supports only JSON files');
    }
  }

  async getItem (key: string): Promise<unknown> {
    const storage = await this.getStorage();
    return storage[key] ?? null;
  }

  async addItem (key: string, value: unknown): Promise<void> {
    const storage = await this.getStorage();
    storage[key] = value;

    await writeFile(this.filePath, JSON.stringify(storage), { flag: 'a+', encoding: 'utf-8' },);
  }

  private async getStorage (): Promise<Record<string, unknown>> {
    try {
      const content = await readFile(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }
}