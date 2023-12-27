import axios, { AxiosInstance } from "axios";
import { config } from "../config/config.ts";
import { fetchSecret } from "../helpers/vault.help.ts";

export class AuthenticationService {
  private client: AxiosInstance | null = null;

  private async initializeClient(): Promise<void> {
    const secret = await fetchSecret({
      secretEngine: config.vault.secretEngine,
      secretPath: config.vault.secretPath,
    });

    this.client = axios.create({
      baseURL: config.sonar.url,
      auth: {
        username: secret.data.data.username,
        password: secret.data.data.password,
      },
    });
  }

  public async getClient(): Promise<AxiosInstance> {
    if (!this.client) {
      await this.initializeClient();
    }
    if (!this.client) {
      throw new Error("Failed to initialize the Axios client");
    }
    return this.client;
  }
}
