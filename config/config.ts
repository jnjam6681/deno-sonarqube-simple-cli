export const config = {
  sonar: {
    url: "http://localhost:9000",
  },
  vault: {
    url: "http://localhost:8200" || Deno.env.get("VAULT_ADDR"),
    token: "" || Deno.env.get("VAULT_TOKEN"),
    secretEngine: "kv",
    secretPath: "sonarqube",
  },
};
