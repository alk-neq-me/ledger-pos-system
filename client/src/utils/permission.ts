export type RoleActionEnum =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "*"
  | "!"

export type SystemRoleEnum = 
  | "admin"
  | "guest"
  | "user"


export const systemRoles: SystemRoleEnum[] = ["admin", "guest", "user"];

export class Permission {
  resource: string;
  action: RoleActionEnum;

  constructor(resource: string, action: RoleActionEnum) {
    this.resource = resource;
    this.action = action;
  }

  get name() {
    return `${this.resource}:${this.action}`
  }
}

/** @name "admin" | "guest" | "user" | ...
  */
export type Role = {
  id: string,
  name: SystemRoleEnum | string,
  permissions: Permission[]
}


class AccessRule {
  access_rules: Map<string, Role>;

  constructor(access_rules: Map<string, Role>) {
    this.access_rules = access_rules;
  }

  addRole(name: string, permissions: Permission[]) {
    this.access_rules.set(name, {
      id: crypto.randomUUID(),
      name,
      permissions
    });
  }

  authorize<U extends { role: string }>(user: U, perm: string) {
    let access: boolean = false;
    const [resource] = perm.split(":");
    const current_rule = this.access_rules.get(user.role);

    if (!current_rule) throw new Error("not found role name");

    for (const permission of current_rule.permissions) {
      if ((perm === permission.name) || ((permission.resource === resource || permission.resource === "*") && permission.action === "*")) {
        access = true
      }
      if (resource == permission.resource && permission.action === "!") {
        access = false
      }
    }

    return access;
  }
}


const rbac = new AccessRule(new Map());


export default rbac;
