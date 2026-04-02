import multer from "multer";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Le fichier est trop volumineux. La taille maximale autorisée est de 2 Mo.",
      });
    }
    return res.status(400).json({
      success: false,
      message: `Erreur d'upload: ${err.message}`,
    });
  }

  const status = err.status || 500;
  const message = err.message || "Une erreur interne est survenue.";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
