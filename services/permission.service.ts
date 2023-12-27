import axios, { AxiosInstance } from "axios";
import { IUserGroup } from "../lib/interfaces.ts";
import { exitCode } from "../lib/enums.ts";
import { _ } from "../deps.ts";

export class PermissionService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async createPermissionTemplate(info: IUserGroup): Promise<void> {
    try {
      await this.client.postForm(`api/permissions/create_template`, {
        name: info.group,
        projectKeyPattern: `${info.group}.*`,
      });
      console.log(`Permission template ${info.group} is created.`);
    } catch (err) {
      this.handleAxiosError(err);
    }
  }

  public async addGroupToTemplate(info: IUserGroup): Promise<void> {
    try {
      const permissions = [
        "admin",
        "codeviewer",
        "issueadmin",
        "securityhotspotadmin",
        "scan",
        "user",
      ];

      const groups = [info.group, "sonar-administrators"];

      for (const group of groups) {
        for (const permission of permissions) {
          await this.client.postForm(`api/permissions/add_group_to_template`, {
            templateName: info.group,
            groupName: group,
            permission: permission,
          });
        }
      }
      console.log(`Add group to permission template ${info.group} is completed.`);
    } catch (err) {
      this.handleAxiosError(err);
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