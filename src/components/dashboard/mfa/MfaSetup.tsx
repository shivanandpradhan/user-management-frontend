import { useState } from "react";
import { useApiMutation } from "../../../hooks/useApi";
import { setupMfa } from "../../../api/auth";
import Modal from "../../common/Modal";
import type { MfaSetupRequest } from "../../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const MfaSetup = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [mfaData, setMfaData] = useState<{
    secret: string;
    qrCode: string;
  } | null>(null);
  const { mutate, isPending } = useApiMutation(
    (data: MfaSetupRequest) => setupMfa(userId!, data),
    {},
    []
  );

  const handleSetup = () => {
    mutate(
      { mfaType: "TOTP" },
      {
        onSuccess: (data) => {
          setMfaData(data && data.data ? data.data : null);
          setIsOpen(true);
        },
      }
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Multi-Factor Authentication</h2>
      <p className="text-sm text-gray-600 mb-4">
        Add an extra layer of security to your account by enabling MFA.
      </p>
      <button
        onClick={handleSetup}
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Setting up..." : "Setup MFA"}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Setup MFA</h3>
          {mfaData && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={mfaData.qrCode}
                  alt="MFA QR Code"
                  className="w-48 h-48"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Or enter this code manually:
                </p>
                <p className="mt-1 text-sm font-mono bg-gray-100 p-2 rounded">
                  {mfaData.secret}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Scan this QR code with your authenticator app (like Google
                Authenticator or Authy) or manually enter the code.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MfaSetup;
