import multer from "multer";

export default class MulterConfig {
  constructor() {
    this.storage = multer.memoryStorage();
    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    });
  }

  fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only image and video files are allowed."));
    }
  };

  getUpload() {
    return this.upload;
  }
}

export const multerConfig = new MulterConfig();
