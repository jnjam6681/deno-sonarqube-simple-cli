import { Command } from 'commander';
import { authentication } from '../auth.ts';
import { createGroup } from '../users_group.ts';

const client = authentication();

export interface IGroup {
  group: string
}

export default function (program: Command) {
  const create = program.command('create');

  create
    .command('group')
    .option('-g, --group <group>', 'group.')
    .action(async (opts: IGroup) => {
      await createGroup(client, opts);
    });
}
