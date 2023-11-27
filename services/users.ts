import { AxiosInstance } from "axios";
import { IUser } from "../lib/interfaces.ts";

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
    return Promise.reject(err.response.data.errors);
  }
}
