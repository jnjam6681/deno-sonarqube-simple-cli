import { Command } from "commander";
import { IUserGroup } from "../interfaces.ts";
import { SonarqubeUserService } from "../../services/user.service.ts";
import { AuthenticationService } from "../../services/auth.service.ts";

export default function (program: Command) {
  const grant = program.command("get");

  grant
    .command("user-group")
    .requiredOption("-u, --user <user>", "specify a user login")
    .description("lists the groups a user belongs to.")
    .action(async (opts: IUserGroup) => {
      const authService = new AuthenticationService();
      const client = await authService.getClient();
      const sonarqubeUserService = new SonarqubeUserService(client)

      console.log(await sonarqubeUserService.getUserGroup(opts))
    });

  grant
    .command("user")
    .requiredOption("-u, --user <user>", "specify a user with email ex. example@email.com")
    .description("get detail information about the user")
    .action(async (opts: IUserGroup) => {
      const authService = new AuthenticationService();
      const client = await authService.getClient();
      const sonarqubeUserService = new SonarqubeUserService(client);

      console.log(await sonarqubeUserService.searchUser(opts))
    });
}
