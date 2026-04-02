// src/config/env.js
import 'dotenv/config';

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  URI: process.env.URI,
};

export default env;
