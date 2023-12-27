import axios, { AxiosInstance } from "axios";
import { _ } from "../deps.ts";
import { exitCode } from "../lib/enums.ts";
import { IUserGroup } from "../types/type.interfaces.ts";

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

export interface ISonarqubeGetUser {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  users: Array<{
    login: string;
    name: string;
    active: boolean;
    email: string;
    groups: [];
    tokensCount: number;
    local: boolean;
    externalIdentity: string;
    externalProvider: string;
    avatar: string;
    managed: boolean;
  }>;
}

export class SonarqubeUserService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async getUserGroup(info: IUserGroup): Promise<ISonarqubeGetUserGroup> {
    try {
      const response = await this.client.get(`api/users/groups`, {
        params: {
          login: info.user,
        },
      });
      console.log(response.data);
      return response.data as ISonarqubeGetUserGroup;
    } catch (err) {
      this.handleAxiosError(err);
      throw err;
    }
  }

  public async searchUser(info: IUserGroup): Promise<ISonarqubeGetUser> {
    try {
      const response = await this.client.get(`api/users/search`, {
        params: {
          q: info.user,
        },
      });
      return response.data as ISonarqubeGetUser;
    } catch (err) {
      this.handleAxiosError(err);
      throw err;
    }
  }

  // deno-lint-ignore no-explicit-any
  private handleAxiosError(err: any): void {
    if (axios.isAxiosError(err)) {
      console.error(_.get(err, "response.data.errors"));
      Deno.exit(exitCode.BAD_REQUEST);
    }
    throw err;
  }
}