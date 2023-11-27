import { Command } from "commander";
import { authentication } from "../../services/authentication.ts";
import { addUserToGroup } from "../../services/users_groups.ts";

export interface IUserGroup {
  user: string;
  group: string;
}

export default function (program: Command) {
  const grant = program.command("grant");

  grant
    .command("user-group")
    .option("-u, --user <user>", "specify a user")
    .option("-g, --group <group>", "specify a group.")
    .description("add a user to a group.")
    .action(async (opts: IUserGroup) => {
      const client = await authentication();
      await addUserToGroup(client, opts);
    });
}
