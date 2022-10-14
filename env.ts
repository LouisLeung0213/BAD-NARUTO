import { config } from "dotenv";
import populateEnv from "populate-env";

config();

export let env = {
  NODE_ENV: "development",
  DB_NAME: "naruto",
  DB_USER: "naruto",
  DB_PASSWORD: "naruto",
};

populateEnv(env, { mode: "halt" });
