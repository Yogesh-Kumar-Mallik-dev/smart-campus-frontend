export type AccessMode = "OR" | "AND";

export const hasPermission = (
    userRoles: string[],
    requiredRoles?: string[],
    mode: AccessMode = "OR"
): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) return true;

  if (mode === "OR") {
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  if (mode === "AND") {
    return requiredRoles.every((role) => userRoles.includes(role));
  }

  return false;
};