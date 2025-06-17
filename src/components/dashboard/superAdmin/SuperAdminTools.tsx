import { useApiMutation } from "../../../hooks/useApi";
import {
  promoteToSuperAdmin,
  demoteFromSuperAdmin,
} from "../../../api/superAdmin";

const SuperAdminTools = ({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) => {
  const isSuperAdmin = currentRole === "ROLE_SUPER_ADMIN";
  const { mutate, isPending } = useApiMutation(
    isSuperAdmin ? demoteFromSuperAdmin : promoteToSuperAdmin,
    {},
    [["super-admin", "admins"]]
  );

  const handleAction = () => {
    mutate(userId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Super Admin Tools</h2>
      <button
        onClick={handleAction}
        disabled={isPending}
        className={`px-4 py-2 rounded-md text-white ${
          isSuperAdmin
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-purple-600 hover:bg-purple-700"
        } disabled:opacity-50`}
      >
        {isPending
          ? "Processing..."
          : isSuperAdmin
          ? "Demote to Admin"
          : "Promote to Super Admin"}
      </button>
    </div>
  );
};

export default SuperAdminTools;
