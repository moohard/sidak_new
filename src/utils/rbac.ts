import { store } from "../redux/store";

/**
 * Checks if the current logged-in user has specific permission for a module.
 * @param moduleName The name or code of the module (e.g., 'pegawai', 'absensi')
 * @param action The type of action (e.g., 'view', 'create', 'update', 'delete', 'verify')
 * @returns boolean
 */
export const canAccess = (moduleName: string, action: 'view' | 'create' | 'update' | 'delete' | 'verify' = 'view'): boolean => {
  const state = store.getState();
  const user = state.auth.user;

  if (!user) return false;

  // Admin usually has full access
  if (user.group === 'admin' || user.group === 'SUPERADMIN') return true;

  // Check against user's permission list
  // The format of permission string is assumed to be "module:action" (e.g., "pegawai:view")
  const permissionToken = `${moduleName}:${action}`;
  return user.permissions.includes(permissionToken);
};

/**
 * Component helper to conditionally render elements based on permission.
 */
export const AuthControl = ({ module, action, children }: { module: string; action?: 'view' | 'create' | 'update' | 'delete' | 'verify'; children: React.ReactNode }) => {
  return canAccess(module, action) ? children : null;
};
