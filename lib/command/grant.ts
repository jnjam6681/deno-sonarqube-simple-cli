import { Command } from "commander";
import { authentication } from "../../services/authentication.ts";
import {
  addUserToGroup,
  createGroup,
  searchGroup,
} from "../../services/users_groups.ts";
import {
  addGroupToTemplate,
  createPermissionTemplate,
} from "../../services/permissions.ts";
import { IUserGroup } from "../interfaces.ts";
import { _ } from "../../deps.ts";
import { searchUser } from "../../services/users.ts";

export default function (program: Command) {
  const grant = program.command("grant");

  grant
    .command("user-group")
    .requiredOption(
      "-u, --user <user...>",
      "specify a user with email ex. example@email.com"
    )
    .requiredOption("-g, --group <group>", "specify a group ex. 001.1_DEV")
    .description("add a user to a group.")
    .action(async (opts: IUserGroup) => {
      const client = await authentication();
      const group = await searchGroup(client, opts);
      const matchGroup = _.some(
        group.groups,
        (group) => group.name === opts.group
      );
      if (matchGroup) {
        console.error([{ msg: `Group ${opts.group} exists in SonarQube` }]);
      } else {
        console.error([
          { msg: `Group ${opts.group} does not exist in SonarQube` },
        ]);
        await createPermissionTemplate(client, opts);
        await createGroup(client, opts);
        await addGroupToTemplate(client, opts);
      }

      for (let i = 0; i < opts.user.length; i++) {
        const user = await searchUser(client, opts);
        const findUser = _.filter(
          user.users,
          (user) => user.email === opts.user[i]
        );

        await addUserToGroup(client, findUser[0].login, opts.group);
      }
    });
}
