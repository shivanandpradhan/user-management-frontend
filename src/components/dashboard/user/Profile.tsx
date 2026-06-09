import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiQuery, useApiMutation } from "../../../hooks/useApi";
import { getProfileByUserId, updateProfile } from "../../../api/users";
import type { UserProfileDto } from "../../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const Profile = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    data: profileData,
    isLoading,
    isSuccess,
  } = useApiQuery(
    ["profile", userId as string],
    () => getProfileByUserId(userId!),
    {
      enabled: !!userId,
    }
  );

  const { mutate: updateProfileMutation, isPending: isUpdating } =
    useApiMutation(
      (data: UserProfileDto) => updateProfile(userId!, data),
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
      [["profile"]]
    );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm<UserProfileDto>();

  useEffect(() => {
    if (isSuccess && profileData?.data) {
      reset(profileData.data);
    }
  }, [isSuccess, profileData, reset]);

  const hasData = isSuccess
    ? Object.values(profileData?.data || {}).some((value) => !!value)
    : false;

  const onSubmit = (data: UserProfileDto): void => {
    updateProfileMutation(data);
  };

  if (!userId) return <div>User not authenticated</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4 shadow">
            <span className="text-4xl text-indigo-600 font-bold">
              {profileData?.data?.firstName?.[0] || "U"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-1 text-center">
            {profileData?.data?.firstName || "User"}{" "}
            {profileData?.data?.lastName || ""}
          </h1>
          <p className="text-gray-500 text-center mb-2">
            {profileData?.data?.email}
          </p>
          {!hasData ? (
            <p className="text-sm text-gray-600 mb-2 text-center">
              Please fill in your profile details to complete your account
              setup.
            </p>
          ) : (
            <p className="text-sm text-gray-600 mb-2 text-center">
              You can edit your profile information by clicking the Edit button.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profileData?.data?.email || ""}
              disabled
              className="mt-1 block w-full rounded-xl px-4 py-2 text-base border-2 bg-gray-100 border-gray-100 shadow text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                {...register("address")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                {...register("city")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                {...register("country")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                {...register("postalCode")}
                disabled={!isEditing}
                className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                  ${
                    !isEditing
                      ? "bg-gray-100 border-gray-100"
                      : "bg-white border-transparent"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
                `}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              {...register("bio")}
              disabled={!isEditing}
              rows={3}
              className={`mt-1 block w-full rounded-xl px-4 py-2 text-base border-2
                ${
                  !isEditing
                    ? "bg-gray-100 border-gray-100"
                    : "bg-white border-transparent"
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition-all placeholder:text-gray-400 disabled:cursor-not-allowed shadow
              `}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow transition"
              >
                {hasData ? "Edit Profile" : "Create Profile"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset(profileData?.data || {});
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 shadow transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || !isDirty}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 shadow transition"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
