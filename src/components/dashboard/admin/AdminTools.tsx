import { useApiMutation } from "../../../hooks/useApi";
import { lockUser, unlockUser } from "../../../api/admin";
import { useState } from "react";

const AdminTools = ({ userId }: { userId: string }) => {
  const [action, setAction] = useState<"lock" | "unlock">("lock");
  const { mutate, isPending } = useApiMutation(
    action === "lock" ? lockUser : unlockUser,
    {},
    [["admin", "users"]]
  );

  const handleAction = () => {
    mutate(userId);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Admin Tools</h2>
      <div className="flex items-center space-x-4">
        <select
          value={action}
          onChange={(e) => setAction(e.target.value as "lock" | "unlock")}
          className="border rounded-md px-3 py-2"
        >
          <option value="lock">Lock User</option>
          <option value="unlock">Unlock User</option>
        </select>
        <button
          onClick={handleAction}
          disabled={isPending}
          className={`px-4 py-2 rounded-md text-white ${
            action === "lock"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } disabled:opacity-50`}
        >
          {isPending ? "Processing..." : action === "lock" ? "Lock" : "Unlock"}
        </button>
      </div>
    </div>
  );
};

export default AdminTools;
