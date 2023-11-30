import axios, { AxiosInstance } from "axios";
import { IUser } from "../lib/interfaces.ts";
import { exitCode } from "../lib/enums.ts";
import { _ } from "../deps.ts";

export interface ISonarqubeGetUserGroup {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  groups: Array<{
    id: number;
    name: string;
    description: string;
    selected: boolean;
    default: boolean;
  }>;
}

export async function getUserGroup(client: AxiosInstance, info: IUser): Promise<ISonarqubeGetUserGroup> {
  try {
    const response = await client.get(`api/users/groups`, {
      params: {
        login: info.user,
      },
    });
    console.log(response.data);
    return response.data as ISonarqubeGetUserGroup;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(_.get(err, "response.data.errors"));
      Deno.exit(exitCode.BAD_REQUEST);
    }
    throw err;
    // return Promise.reject(err.response.data.errors);
  }
}
