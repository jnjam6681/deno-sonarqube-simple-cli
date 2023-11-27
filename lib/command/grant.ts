import { Command } from "commander";
import { authentication } from "../../services/authentication.ts";
import { addUserToGroup, createGroup, searchGroup } from "../../services/users_groups.ts";
import { addGroupToTemplate, createPermissionTemplate } from "../../services/permissions.ts";
import { IUserGroup } from "../interfaces.ts";
import { _ } from "../../deps.ts";

export default function (program: Command) {
  const grant = program.command("grant");

  grant
    .command("user-group")
    .requiredOption("-u, --user <user>", "specify a user")
    .requiredOption("-g, --group <group>", "specify a group.")
    .description("add a user to a group.")
    .action(async (opts: IUserGroup) => {
      const client = await authentication();

      const group = await searchGroup(client, opts);
      if (group.groups.length > 0) {
        console.log(`group ${opts.group} exists in SonarQube.`);
      } else {
        console.log(`group ${opts.group} does not exist in SonarQube.`);
        await createPermissionTemplate(client, opts)
        await createGroup(client, opts);
        await addGroupToTemplate(client, opts);
      }

      await addUserToGroup(client, opts);
    });
}
