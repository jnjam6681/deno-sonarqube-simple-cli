import axios, { AxiosInstance } from "axios";
import { IUserGroup } from "../types/type.interfaces.ts";
import { exitCode } from "../types/type.enum.ts";
import { _ } from "../deps.ts";

export interface ISonarqubePermissionSearchTemplate {
  permissionTemplates: Array<{
    id: string;
    name: string;
    projectKeyPattern?: string;
    description?: string;
  }>;
}

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
      console.log(
        `Add group to permission template ${info.group} is completed.`
      );
    } catch (err) {
      this.handleAxiosError(err);
    }
  }

  public async searchTemplate(
    name: string
  ): Promise<ISonarqubePermissionSearchTemplate> {
    try {
      const response = await this.client.get(
        `api/permissions/search_templates`,
        {
          params: {
            q: name,
          },
        }
      );
      return response.data as ISonarqubePermissionSearchTemplate;
    } catch (err) {
      this.handleAxiosError(err);
      throw err; // Add this throw statement or specify a default return value
    }
  }

  public async updateTemplate(id: string, newName: string): Promise<void> {
    try {
      await this.client.postForm(`api/permissions/update_template`, {
        id: id,
        name: newName,
        projectKeyPattern: `${newName}.*`,
      });
      console.log(`Update permission template to ${newName} is successful.`);
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
