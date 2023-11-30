import axios, { AxiosInstance } from "axios";
import { IUserGroup } from "../lib/interfaces.ts";
import { exitCode } from "../lib/enums.ts";
import { _ } from "../deps.ts";

export async function addUserToGroup(client: AxiosInstance, info: IUserGroup) {
  try {
    await client.postForm(`api/user_groups/add_user`, {
      login: info.user,
      name: info.group,
    });
    console.log("Add user to group is success.");
  } catch (err) {
    console.error(err.response.data.errors);
    Deno.exit(exitCode.BAD_REQUEST);
  }
}

export async function createGroup(client: AxiosInstance, info: IUserGroup) {
  try {
    await client.postForm(`api/user_groups/create`, {
      name: info.group,
    });
    console.log("Group is created.");
  } catch (err) {
    console.error(err.response.data.errors);
    Deno.exit(exitCode.BAD_REQUEST);
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
  info: IUserGroup
): Promise<ISonarqubeGroupSearch> {
  try {
    const response = await client.get(`api/user_groups/search`, {
      params: {
        q: info.group,
      },
    });
    return response.data as ISonarqubeGroupSearch;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(_.get(err, "response.data.errors"));
      Deno.exit(exitCode.BAD_REQUEST);
    }
    throw err;
    // return Promise.reject(err.response.data.errors);
  }
}
