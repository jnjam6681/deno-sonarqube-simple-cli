import { Command } from "commander";
import { IUser } from "../interfaces.ts";
import { authentication } from "../../services/authentication.ts";
import { getUserGroup, searchUser } from "../../services/users.ts";

export default function (program: Command) {
  const grant = program.command("get");

  grant
    .command("user-group")
    .requiredOption("-u, --user <user>", "specify a user login")
    .description("lists the groups a user belongs to.")
    .action(async (opts: IUser) => {
      const client = await authentication();

      await getUserGroup(client, opts);
    });

  grant
    .command("user")
    .requiredOption("-u, --user <user>", "specify a user with email ex. example@email.com")
    .description("get detail information about the user")
    .action(async (opts: IUser) => {
      const client = await authentication();

      await searchUser(client, opts);
    });
}
