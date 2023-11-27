import { AxiosInstance } from "axios";
import { config } from "../config/config.ts";
import { axios } from "../deps.ts";
import { fetchSecret } from "../lib/vault.ts";

export async function authentication(): Promise<AxiosInstance> {
  const secret = await fetchSecret({
    secretEngine: "" || config.vault.secretEngine,
    secretPath: "" || config.vault.secretPath,
  });

  const client = axios.create({
    baseURL: config.sonar.url,
    auth: {
      username: secret.data.data.username,
      password: secret.data.data.password,
    },
  });

  return client;
}
