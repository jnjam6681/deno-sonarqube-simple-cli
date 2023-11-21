import { AxiosInstance } from 'axios';
import { IUserGroup } from './command/grant.ts';
import { IGroup } from "./command/create.ts";

export async function addUserToGroup(client: AxiosInstance, info: IUserGroup) {
  try {
    await client.postForm(`api/user_groups/add_user`, {
      login: info.user,
      name: info.group,
    });
    console.log('update success.');
  } catch (err) {
    console.error(err.response.data.errors);
  }
}

export async function createGroup(client: AxiosInstance, info: IGroup) {
  try {
    await client.postForm(`api/user_groups/create`, {
      name: info.group,
    });
    console.log('your group is created.');
  } catch (err) {
    console.error(err.response.data.errors);
  }
}