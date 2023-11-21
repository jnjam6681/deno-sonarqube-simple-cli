import { Command } from 'commander';
import { authentication } from '../auth.ts';
import { addUserToGroup } from '../users_group.ts';

const client = authentication();

export interface IUserGroup {
  user: string,
  group: string
}

export default function (program: Command) {
  const grant = program.command('grant');

  grant
    .command('user-group')
    .option('-u, --user <user>', 'user.')
    .option('-g, --group <group>', 'group.')
    .action(async (opts: IUserGroup) => {
      await addUserToGroup(client, opts);
    });
}
