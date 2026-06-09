import { useApiMutation } from "../../../hooks/useApi";
import { lockUser, unlockUser } from "../../../api/admin";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface AdminToolsProps {
  userId: string;
  onComplete?: () => void;
}
const AdminTools = ({ userId, onComplete }: AdminToolsProps) => {
  const [action, setAction] = useState<"lock" | "unlock">("lock");

  const actingUserId = useSelector((state: RootState) => state.auth.user?.id);

  // Correct: Accept an object with both IDs
  const { mutate, isPending } = useApiMutation(
    ({ userId, actingUserId }: { userId: string; actingUserId: string }) =>
      action === "lock"
        ? lockUser(userId, actingUserId)
        : unlockUser(userId, actingUserId),
    {
      onSuccess: () => {
        onComplete?.();
      },
    },
    [["admin", "users"]]
  );

  const handleAction = () => {
    if (!actingUserId) return;
    mutate({ userId, actingUserId });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-xl font-extrabold text-indigo-700 mb-6 tracking-tight">
        Admin Tools
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          value={action}
          onChange={(e) => setAction(e.target.value as "lock" | "unlock")}
          className="px-4 py-2 rounded-lg border border-indigo-200 bg-white shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-indigo-700 font-semibold"
        >
          <option value="lock">Lock User</option>
          <option value="unlock">Unlock User</option>
        </select>
        <button
          onClick={handleAction}
          disabled={isPending}
          className={`px-6 py-2 rounded-lg font-bold shadow transition text-white ${
            action === "lock"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } disabled:opacity-50`}
        >
          {isPending ? "Processing..." : action === "lock" ? "Lock" : "Unlock"}
        </button>
      </div>
    </div>
  );
};

export default AdminTools;
