import axios, { AxiosInstance } from "axios";
import { IUserGroup } from "../lib/interfaces.ts";
import { exitCode } from "../lib/enums.ts";
import { _ } from "../deps.ts";

export async function createPermissionTemplate(
  client: AxiosInstance,
  info: IUserGroup
) {
  try {
    await client.postForm(`api/permissions/create_template`, {
      name: info.group,
      projectKeyPattern: `${info.group}.*`,
    });
    console.log(`Permission template ${info.group} is created.`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(_.get(err, "response.data.errors"));
      Deno.exit(exitCode.BAD_REQUEST);
    }
    throw err;
  }
}

export async function addGroupToTemplate(
  client: AxiosInstance,
  info: IUserGroup
) {
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
        await client.postForm(`api/permissions/add_group_to_template`, {
          templateName: info.group,
          groupName: group,
          permission: permission,
        });
      }
    }
    console.log(`Add group to permission template ${info.group} is completed.`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(_.get(err, "response.data.errors"));
      Deno.exit(exitCode.BAD_REQUEST);
    }
    throw err;
  }
}
