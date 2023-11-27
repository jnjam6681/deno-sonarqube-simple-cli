export const config = {
  sonar: {
    url: "http://localhost:9000",
  },
  vault: {
    url: "http://localhost:8200",
    token: "hvs.quuMBDQ2Wys8zjRaaUNqBOOq" || Deno.env.get("VAULT_TOKEN"),
    secretEngine: "kv",
    secretPath: "sonarqube",
  },
};
