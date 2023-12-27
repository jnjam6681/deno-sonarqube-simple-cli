import { program } from "commander";

function errorColor(str: string) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program
  .configureHelp({
    sortOptions: false,
    showGlobalOptions: true,
  })
  .configureOutput({
    outputError: (str, write) => write(errorColor(str)),
  })
  .name("sonar-gen")
  .description("Example command sonarqube from deno");

(await import("./commands/grant.ts")).default(program);
(await import("./commands/get.ts")).default(program);

program.parse();
