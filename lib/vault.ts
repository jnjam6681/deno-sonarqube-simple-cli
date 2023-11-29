import { config } from "../config/config.ts";
import { axios } from "../deps.ts";
import { exitCode } from "./enums.ts";


interface IVault {
  secretEngine: string;
  secretPath: string;
}

export interface IVaultSecret {
  data: {
    data: {
      password: string;
      username: string;
    };
    metadata: {
      created_time: string;
      deletion_time: string;
      destroyed: boolean;
      version: number;
    };
  };
}

const client = axios.create({
  baseURL: config.vault.url,
  headers: {
    "Content-Type": "application/json",
    "X-Vault-Token": config.vault.token,
  },
});

export async function fetchSecret(vaultOption: IVault): Promise<IVaultSecret> {
  const response = await client.get(
    `${config.vault.url}/v1/${vaultOption.secretEngine}/data/${vaultOption.secretPath}`
  );

  if (response.status !== 200) {
    const data = await response.data;
    return data;
  } else {
    console.error("failed to fetch secret.")
    Deno.exit(exitCode.BAD_REQUEST);
    // throw new Error("failed to fetch secret.");
  }
}
