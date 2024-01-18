import { Command } from "commander";
import { AuthenticationService } from "../services/auth.service.ts";
import { SonarqubeGroupService } from "../services/user_group.service.ts";
import {
  ISonarqubePermissionSearchTemplate,
  PermissionService,
} from "../services/permission.service.ts";
import { _ } from "../deps.ts";

interface IUpdateGroup {
  currentName: string;
  newName: string;
}

export default function (program: Command) {
  const update = program.command("update");

  update
    .command("group")
    .requiredOption(
      "--current-name <currentName>",
      "specify a current name of group"
    )
    .requiredOption("--new-name <newName>", "specify a new name of group")
    .description("update a group")
    .action(async (opts: IUpdateGroup) => {
      const authService = new AuthenticationService();
      const client = await authService.getClient();
      const _sonarqubeGroupService = new SonarqubeGroupService(client);
      const _permissionService = new PermissionService(client);

      const group = await _sonarqubeGroupService.searchGroup({
        group: opts.currentName,
        user: opts.newName,
      });

      const matchGroup = _.filter(
        group.groups,
        (group) => group.name.toUpperCase() === opts.currentName.toUpperCase()
      );

      console.log(matchGroup)

      if (matchGroup.length > 0) {
        await _sonarqubeGroupService.updateGroup(
          // opts.currentName,
          matchGroup[0].name,
          opts.newName
        );

        const findTemplate: ISonarqubePermissionSearchTemplate =
          await _permissionService.searchTemplate(opts.currentName);

        await _permissionService.updateTemplate(
          findTemplate.permissionTemplates[0].id,
          opts.newName
        );
      } else {
        console.error(`Not found a group (${opts.currentName})`);
      }
    });
}
