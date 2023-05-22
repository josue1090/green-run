import { Request, ResponseToolkit } from "@hapi/hapi";
import { Role } from "../enums/role.enum";

export function authorizeRole(requiredRole: Role) {
  return async (request: Request, h: ResponseToolkit) => {
    const { user } = request.auth.credentials as any;

    // Check if the user has the required role
    if (user.role !== requiredRole) {
      return h.response("Unauthorized").code(401);
    }

    // Proceed to the route handler if authorized
    return h.continue;
  };
}
