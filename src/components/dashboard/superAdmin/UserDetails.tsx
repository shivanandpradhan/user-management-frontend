import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/admin";
import { useApiQuery } from "../../../hooks/useApi";
import AdminTools from "../admin/AdminTools";
import type { RootState } from "../../../store/store";

const UserDetails = () => {
  const { userId } = useParams();
  const actingUserId = useSelector((state: RootState) => state.auth.user?.id);
  const { data, isLoading } = useApiQuery(
    ["user", userId as string],
    () => getUserDetails(userId!, actingUserId!),
    { enabled: !!userId && !!actingUserId }
  );

  if (isLoading) return <div>Loading user details...</div>;
  if (!data) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm">
              {data.data?.firstName} {data.data?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm">{data.data?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-sm">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  data.data?.enabled
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {data.data?.enabled ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Roles</p>
            <p className="mt-1 text-sm">
              {data.data?.roles?.join(", ") || "No roles assigned"}
            </p>
          </div>
        </div>
      </div>

      <AdminTools userId={userId || ""} />
    </div>
  );
};

export default UserDetails;
