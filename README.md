# deno sonarqube cli

please setup config before build.
`config/config.ts`
```
sonar: {
    url: "http://localhost:9000",
},
vault: {
    url: "http://localhost:8200" || Deno.env.get("VAULT_ADDR"),
    token: "" || Deno.env.get("VAULT_TOKEN"),
    secretEngine: "",
    secretPath: "",
},
```

build executable
```
deno task compile
```

grant permission to user.
```
sonar-cli grant user-group -u "<email>" -g "<group>"
```
use email to find user login and group use jenkins folder.