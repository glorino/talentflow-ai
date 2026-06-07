import { UserRole } from "@talentflow/types";

export interface Permission {
  resource: string;
  actions: string[];
}

export interface RolePermissions {
  role: UserRole;
  level: number;
  permissions: Permission[];
  inherits?: UserRole[];
}

const ROLE_DEFINITIONS: Record<UserRole, RolePermissions> = {
  super_admin: {
    role: "super_admin",
    level: 100,
    permissions: [
      { resource: "*", actions: ["*"] },
    ],
  },
  company_admin: {
    role: "company_admin",
    level: 90,
    permissions: [
      { resource: "company", actions: ["read", "update", "delete"] },
      { resource: "employees", actions: ["create", "read", "update", "delete"] },
      { resource: "departments", actions: ["create", "read", "update", "delete"] },
      { resource: "jobs", actions: ["create", "read", "update", "delete", "publish"] },
      { resource: "payroll", actions: ["create", "read", "update", "process", "approve"] },
      { resource: "leave", actions: ["create", "read", "update", "approve", "reject"] },
      { resource: "attendance", actions: ["read", "update", "approve"] },
      { resource: "performance", actions: ["create", "read", "update", "approve"] },
      { resource: "learning", actions: ["create", "read", "update", "delete", "enroll"] },
      { resource: "compliance", actions: ["create", "read", "update", "audit"] },
      { resource: "reports", actions: ["read", "export"] },
      { resource: "settings", actions: ["read", "update"] },
      { resource: "ai_agents", actions: ["read", "execute", "configure"] },
      { resource: "users", actions: ["create", "read", "update", "delete", "assign_role"] },
    ],
  },
  hr_director: {
    role: "hr_director",
    level: 80,
    permissions: [
      { resource: "employees", actions: ["create", "read", "update"] },
      { resource: "departments", actions: ["create", "read", "update"] },
      { resource: "jobs", actions: ["create", "read", "update", "publish"] },
      { resource: "recruitment", actions: ["read", "screen", "interview", "offer"] },
      { resource: "payroll", actions: ["read", "approve"] },
      { resource: "leave", actions: ["read", "approve", "reject"] },
      { resource: "attendance", actions: ["read", "approve"] },
      { resource: "performance", actions: ["create", "read", "update", "approve"] },
      { resource: "learning", actions: ["create", "read", "update", "enroll"] },
      { resource: "compliance", actions: ["read", "audit"] },
      { resource: "reports", actions: ["read", "export"] },
      { resource: "ai_agents", actions: ["read", "execute"] },
    ],
  },
  hr_manager: {
    role: "hr_manager",
    level: 70,
    permissions: [
      { resource: "employees", actions: ["create", "read", "update"] },
      { resource: "departments", actions: ["read"] },
      { resource: "jobs", actions: ["create", "read", "update"] },
      { resource: "recruitment", actions: ["read", "screen", "interview"] },
      { resource: "payroll", actions: ["read"] },
      { resource: "leave", actions: ["read", "approve", "reject"] },
      { resource: "attendance", actions: ["read"] },
      { resource: "performance", actions: ["create", "read", "update"] },
      { resource: "learning", actions: ["read", "enroll"] },
      { resource: "compliance", actions: ["read"] },
      { resource: "reports", actions: ["read"] },
    ],
  },
  recruiter: {
    role: "recruiter",
    level: 60,
    permissions: [
      { resource: "employees", actions: ["read"] },
      { resource: "jobs", actions: ["create", "read", "update", "publish"] },
      { resource: "recruitment", actions: ["create", "read", "update", "screen", "interview", "offer"] },
      { resource: "candidates", actions: ["create", "read", "update", "delete"] },
      { resource: "applications", actions: ["create", "read", "update"] },
      { resource: "reports", actions: ["read"] },
    ],
  },
  hiring_manager: {
    role: "hiring_manager",
    level: 55,
    permissions: [
      { resource: "jobs", actions: ["read", "request"] },
      { resource: "recruitment", actions: ["read", "interview", "feedback"] },
      { resource: "candidates", actions: ["read"] },
      { resource: "applications", actions: ["read", "feedback"] },
      { resource: "reports", actions: ["read"] },
    ],
  },
  payroll_admin: {
    role: "payroll_admin",
    level: 65,
    permissions: [
      { resource: "employees", actions: ["read"] },
      { resource: "payroll", actions: ["create", "read", "update", "process"] },
      { resource: "attendance", actions: ["read"] },
      { resource: "reports", actions: ["read", "export"] },
    ],
  },
  compliance_officer: {
    role: "compliance_officer",
    level: 65,
    permissions: [
      { resource: "employees", actions: ["read"] },
      { resource: "compliance", actions: ["create", "read", "update", "audit"] },
      { resource: "learning", actions: ["read"] },
      { resource: "reports", actions: ["read", "export"] },
    ],
  },
  employee: {
    role: "employee",
    level: 10,
    permissions: [
      { resource: "profile", actions: ["read", "update"] },
      { resource: "leave", actions: ["create", "read"] },
      { resource: "attendance", actions: ["read", "clock_in", "clock_out"] },
      { resource: "performance", actions: ["read", "self_assess"] },
      { resource: "learning", actions: ["read", "enroll"] },
      { resource: "payslips", actions: ["read"] },
      { resource: "documents", actions: ["read"] },
    ],
  },
  contractor: {
    role: "contractor",
    level: 5,
    permissions: [
      { resource: "profile", actions: ["read"] },
      { resource: "attendance", actions: ["read", "clock_in", "clock_out"] },
      { resource: "documents", actions: ["read"] },
    ],
  },
};

export class PermissionManager {
  private roles: Map<UserRole, RolePermissions>;

  constructor() {
    this.roles = new Map(Object.entries(ROLE_DEFINITIONS));
  }

  hasPermission(
    userRole: UserRole,
    resource: string,
    action: string
  ): boolean {
    const roleDef = this.roles.get(userRole);
    if (!roleDef) return false;

    for (const perm of roleDef.permissions) {
      if (perm.resource === "*" && perm.actions.includes("*")) {
        return true;
      }
      if (perm.resource === resource || perm.resource === "*") {
        if (perm.actions.includes(action) || perm.actions.includes("*")) {
          return true;
        }
      }
    }

    return false;
  }

  canAccess(userRole: UserRole, resource: string, action: string): boolean {
    return this.hasPermission(userRole, resource, action);
  }

  canManageEmployee(
    managerRole: UserRole,
    targetRole: UserRole
  ): boolean {
    const managerLevel = this.roles.get(managerRole)?.level ?? 0;
    const targetLevel = this.roles.get(targetRole)?.level ?? 0;
    return managerLevel > targetLevel;
  }

  getRolePermissions(role: UserRole): RolePermissions | undefined {
    return this.roles.get(role);
  }

  getAllRoles(): RolePermissions[] {
    return Array.from(this.roles.values());
  }

  getRoleLevel(role: UserRole): number {
    return this.roles.get(role)?.level ?? 0;
  }
}

export const permissionManager = new PermissionManager();

export function withPermission(
  resource: string,
  action: string
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const context = args[0] as { userRole?: UserRole };
      if (!context?.userRole) {
        throw new Error("No user role provided");
      }
      if (!permissionManager.hasPermission(context.userRole, resource, action)) {
        throw new Error(
          `Insufficient permissions: ${context.userRole} cannot ${action} ${resource}`
        );
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
