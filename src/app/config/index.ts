/* eslint-disable no-undef */
import dotenv from 'dotenv';

import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  database_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASS,
};
