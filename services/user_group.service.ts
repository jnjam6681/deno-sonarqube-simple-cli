import axios, { AxiosInstance } from "axios";
import { IUserGroup } from "../types/type.interfaces.ts";
import { exitCode } from "../types/type.enum.ts";
import { _ } from "../deps.ts";

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

export class SonarqubeGroupService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async addUserToGroup(user: string, group: string): Promise<void> {
    try {
      await this.client.postForm(`api/user_groups/add_user`, {
        login: user,
        name: group,
      });
      console.log("Add user to group is successful.");
    } catch (err) {
      this.handleAxiosError(err);
      return; // Add this return statement
    }
  }

  public async createGroup(info: IUserGroup): Promise<void> {
    try {
      await this.client.postForm(`api/user_groups/create`, {
        name: info.group,
      });
      console.log("Group is created.");
    } catch (err) {
      this.handleAxiosError(err);
      return; // Add this return statement
    }
  }

  public async searchGroup(info: IUserGroup): Promise<ISonarqubeGroupSearch> {
    try {
      const response = await this.client.get(`api/user_groups/search`, {
        params: {
          q: info.group,
        },
      });
      return response.data as ISonarqubeGroupSearch;
    } catch (err) {
      this.handleAxiosError(err);
      throw err; // Add this throw statement or specify a default return value
    }
  }

  public async updateGroup(currentName: string, name: string): Promise<void> {
    try {
      await this.client.postForm(`api/user_groups/update`, {
        currentName: currentName,
        name: name,
      });
      console.log(`Update a group (${currentName}) to ${name}`)
    } catch (err) {
      this.handleAxiosError(err);
      return; // Add this return statement
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
