export const FILE_SIZE = {
  THREE_MB: 3145728,
};

export class FileHelper {
  static async getBase64FromFile(file: Express.Multer.File): Promise<string> {
    return file['buffer'].toString('base64');
  }

  static getFileFromBase64(strBase64: string): Buffer {
    return Buffer.from(strBase64, 'base64');
  }
}
