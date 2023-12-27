import { Command } from "commander";
import { IUserGroup } from "../types/type.interfaces.ts";
import { _ } from "../deps.ts";
import { exitCode } from "../types/type.enum.ts";
import { SonarqubeGroupService } from "../services/user_group.service.ts";
import { PermissionService } from "../services/permission.service.ts";
import { SonarqubeUserService } from "../services/user.service.ts";
import { AuthenticationService } from "../services/auth.service.ts";

export default function (program: Command) {
  const grant = program.command("grant");

  grant
    .command("user-group")
    .requiredOption(
      "-u, --user <user>",
      "specify a user with email ex. example@email.com"
    )
    .requiredOption("-g, --group <group>", "specify a group ex. 001.1_DEV")
    .description("add a user to a group.")
    .action(async (opts: IUserGroup) => {
      const authService = new AuthenticationService();
      const client = await authService.getClient();

      const sonarqubeGroupService = new SonarqubeGroupService(client)
      const permissionService = new PermissionService(client);
      const sonarqubeUserService = new SonarqubeUserService(client)

      const group = await sonarqubeGroupService.searchGroup(opts);
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
        await permissionService.createPermissionTemplate(opts);
        await sonarqubeGroupService.createGroup(opts);
        await permissionService.addGroupToTemplate(opts);
      }

      const user = await sonarqubeUserService.searchUser(opts);
      const findUser = _.filter(user.users, (user) => user.email === opts.user);

      if (findUser.length > 0) {
        await sonarqubeGroupService.addUserToGroup(findUser[0].login, opts.group);
      } else {
        console.error(`Not found user ${opts.user}`);
        Deno.exit(exitCode.USER_NOT_FOUND);
      }
    });
}
