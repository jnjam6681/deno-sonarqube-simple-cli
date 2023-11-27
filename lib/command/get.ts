import { Command } from "commander";
import { IUser } from "../interfaces.ts";
import { authentication } from "../../services/authentication.ts";
import { getUserGroup } from "../../services/users.ts";

export default function (program: Command) {
  const grant = program.command("get");

  grant
    .command("user-group")
    .requiredOption("-u, --user <user>", "specify a user")
    .description("lists the groups a user belongs to.")
    .action(async (opts: IUser) => {
      const client = await authentication();

      await getUserGroup(client, opts);
    });
}
