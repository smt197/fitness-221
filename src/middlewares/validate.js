import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation échouée",
      errors: result.error.format(),
    });
  }

  req.body = result.data;
  next();
};

export default validate;
