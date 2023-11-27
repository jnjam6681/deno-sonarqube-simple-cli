import { AxiosInstance } from "axios";
import { IUserGroup } from "../lib/command/grant.ts";
import { IGroup } from "../lib/command/create.ts";

export async function addUserToGroup(client: AxiosInstance, info: IUserGroup) {
  try {
    await client.postForm(`api/user_groups/add_user`, {
      login: info.user,
      name: info.group,
    });
    console.log("update success.");
  } catch (err) {
    console.error(err.response.data.errors);
  }
}

export async function createGroup(client: AxiosInstance, info: IGroup) {
  try {
    await client.postForm(`api/user_groups/create`, {
      name: info.group,
    });
    console.log("your group is created.");
  } catch (err) {
    console.error(err.response.data.errors);
  }
}

export interface ISonarqubeGroupSearch {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  groups: Array<{
    name: string;
    description: string;
    membersCount: number;
    default: boolean;
    managed: boolean;
  }>;
}

export async function searchGroup(
  client: AxiosInstance,
  info: IGroup
): Promise<ISonarqubeGroupSearch> {
  try {
    const response = await client.get(`api/user_groups/search`, {
      params: {
        q: info.group,
      },
    });
    return response.data as ISonarqubeGroupSearch;
  } catch (err) {
    return Promise.reject(err.response.data.errors);
  }
}
