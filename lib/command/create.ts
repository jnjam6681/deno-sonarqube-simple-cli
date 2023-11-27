import { Command } from "commander";
import { authentication } from "../../services/authentication.ts";
import { createGroup } from "../../services/users_groups.ts";

export interface IGroup {
  group: string;
}

export default function (program: Command) {
  const create = program.command("create");

  create
    .command("group")
    .option("-g, --group <group>", "group.")
    .action(async (opts: IGroup) => {
      const client = await authentication();
      await createGroup(client, opts);
    });
}
