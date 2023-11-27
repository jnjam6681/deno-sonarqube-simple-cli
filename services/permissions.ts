import { AxiosInstance } from "axios";
import { IUserGroup } from "../lib/interfaces.ts";

export async function createPermissionTemplate(
  client: AxiosInstance,
  info: IUserGroup
) {
  try {
    await client.postForm(`api/permissions/create_template`, {
      name: info.group,
      projectKeyPattern: `${info.group}.*`,
    });
    console.log(`permission template ${info.group} is created.`);
  } catch (err) {
    console.error(err.response.data.errors);
  }
}

export async function addGroupToTemplate(client: AxiosInstance, info: IUserGroup) {
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
    console.log(`add group to permission template ${info.group} is completed.`);
  } catch (err) {
    console.error(err.response.data.errors);
  }
}
