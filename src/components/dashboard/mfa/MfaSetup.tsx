import { useState } from "react";
import { useApiMutation } from "../../../hooks/useApi";
import { disableMfa, setupMfa } from "../../../api/auth";
import Modal from "../../common/Modal";
import type { ApiResponse, MfaSetupRequest } from "../../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { UserSecurityDto } from "../../../types/user";

interface MfaSetupProps {
  onComplete?: () => void;
  data?: UserSecurityDto;
}

const MfaSetup = ({ onComplete, data }: MfaSetupProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isOpen, setIsOpen] = useState(false);
  const [mfaData, setMfaData] = useState<{
    secret: string;
    qrCode: string;
  } | null>(null);

  const { mutate: setupMfaMutation, isPending: isSettingUp } = useApiMutation(
    (data: MfaSetupRequest) => setupMfa(userId!, data),
    {
      onSuccess: (data: ApiResponse<{ qrCode: string; secret: string }>) => {
        setMfaData(data?.data ?? null);
        setIsOpen(true);
      },
    },
    []
  );

  const { mutate: disableMfaMutation, isPending: isDisabling } = useApiMutation(
    () => disableMfa(userId!),
    {
      onSuccess: () => {
        onComplete?.();
      },
    },
    []
  );

  const handleSetupMfa = () => {
    setupMfaMutation({ mfaType: "TOTP" });
  };

  const handleDisableMfa = () => {
    disableMfaMutation(undefined);
  };

  const handleClose = () => {
    setIsOpen(false);
    onComplete?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full shadow">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-indigo-700">
          Multi-Factor Authentication
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        After setup, scan the QR code with your authenticator app and click{" "}
        <span className="font-semibold text-indigo-600">Done</span> only when
        finished. If you skip this, you won't get codes. To try again, disable
        MFA and set it up once more.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSetupMfa}
          disabled={isSettingUp || data?.mfaEnabled}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isSettingUp || data?.mfaEnabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          }`}
        >
          {isSettingUp ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Setting up...
            </span>
          ) : (
            "Set up authenticator app"
          )}
        </button>

        <button
          onClick={handleDisableMfa}
          disabled={isDisabling || !data?.mfaEnabled}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isDisabling || !data?.mfaEnabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-red-50 text-red-600 hover:bg-red-100 shadow-sm"
          }`}
        >
          {isDisabling ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
              Disabling...
            </span>
          ) : (
            "Turn off 2FA"
          )}
        </button>
      </div>

      {/* Modern Modal */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="p-0 overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Set up authenticator app
              </h3>
              <button
                onClick={handleClose}
                className="text-indigo-100 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-indigo-100 text-sm">
              Scan the QR code or enter the setup key in your authenticator app
            </p>
          </div>

          {mfaData && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-6">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-inner">
                  <img
                    src={mfaData.qrCode}
                    alt="MFA QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manual entry code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={mfaData.secret}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(mfaData.secret)
                      }
                      className="absolute right-2 top-2 p-1 text-gray-400 hover:text-indigo-600 transition"
                      title="Copy to clipboard"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex gap-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> Make sure to save this setup key
                    in a secure place. You'll need it if you lose access to your
                    authenticator app.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  I've saved my setup key
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

// import { useState } from "react";
// import { useApiMutation } from "../../../hooks/useApi";
// import { disableMfa, setupMfa } from "../../../api/auth";
// import Modal from "../../common/Modal";
// import type { ApiResponse, MfaSetupRequest } from "../../../types";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../store/store";
// import type { UserSecurityDto } from "../../../types/user";

// interface MfaSetupProps {
//   onComplete?: () => void;
//   data?: UserSecurityDto;
// }

// const MfaSetup = ({ onComplete, data }: MfaSetupProps) => {
//   const userId = useSelector((state: RootState) => state.auth.user?.id);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mfaData, setMfaData] = useState<{
//     secret: string;
//     qrCode: string;
//   } | null>(null);

//   const { mutate: setupMfaMutation, isPending: isSettingUp } = useApiMutation(
//     (data: MfaSetupRequest) => setupMfa(userId!, data),
//     {
//       onSuccess: (data: ApiResponse<{ qrCode: string; secret: string }>) => {
//         setMfaData(data?.data ?? null);
//         setIsOpen(true);
//       },
//     },
//     []
//   );

//   const { mutate: disableMfaMutation, isPending: isDisabling } = useApiMutation(
//     () => disableMfa(userId!),
//     {
//       onSuccess: () => {
//         onComplete?.();
//       },
//     },
//     []
//   );

//   const handleSetupMfa = () => {
//     setupMfaMutation({ mfaType: "TOTP" });
//   };

//   const handleDisableMfa = () => {
//     disableMfaMutation(undefined);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     onComplete?.();
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-md">
//       <div className="flex items-start gap-4">
//         <div className="bg-indigo-50 p-3 rounded-lg flex-shrink-0">
//           <svg
//             className="w-6 h-6 text-indigo-600"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={1.5}
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
//             />
//           </svg>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">
//             Two-Factor Authentication (2FA)
//           </h2>
//           <p className="mt-1 text-sm text-gray-500">
//             Add an extra layer of security to your account. After setup, you'll
//             need to enter both your password and an authentication code.
//           </p>

//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleSetupMfa}
//               disabled={isSettingUp || data?.mfaEnabled}
//               className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                 isSettingUp || data?.mfaEnabled
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
//               }`}
//             >
//               {isSettingUp ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   Setting up...
//                 </span>
//               ) : (
//                 "Set up authenticator app"
//               )}
//             </button>

//             <button
//               onClick={handleDisableMfa}
//               disabled={isDisabling || !data?.mfaEnabled}
//               className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                 isDisabling || !data?.mfaEnabled
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-red-50 text-red-600 hover:bg-red-100 shadow-sm"
//               }`}
//             >
//               {isDisabling ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="inline-block w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
//                   Disabling...
//                 </span>
//               ) : (
//                 "Turn off 2FA"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modern Modal */}
//       <Modal isOpen={isOpen} onClose={handleClose}>
//         <div className="p-0 overflow-hidden rounded-xl">
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-semibold">
//                 Set up authenticator app
//               </h3>
//               <button
//                 onClick={handleClose}
//                 className="text-indigo-100 hover:text-white transition"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <p className="mt-1 text-indigo-100 text-sm">
//               Scan the QR code or enter the setup key in your authenticator app
//             </p>
//           </div>

//           {mfaData && (
//             <div className="p-6 space-y-6">
//               <div className="flex flex-col items-center gap-6">
//                 <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-inner">
//                   <img
//                     src={mfaData.qrCode}
//                     alt="MFA QR Code"
//                     className="w-48 h-48 object-contain"
//                   />
//                 </div>

//                 <div className="w-full">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Manual entry code
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={mfaData.secret}
//                       readOnly
//                       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                     <button
//                       onClick={() =>
//                         navigator.clipboard.writeText(mfaData.secret)
//                       }
//                       className="absolute right-2 top-2 p-1 text-gray-400 hover:text-indigo-600 transition"
//                       title="Copy to clipboard"
//                     >
//                       <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                 <div className="flex gap-3">
//                   <svg
//                     className="flex-shrink-0 w-5 h-5 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <p className="text-sm text-blue-700">
//                     <strong>Important:</strong> Make sure to save this setup key
//                     in a secure place. You'll need it if you lose access to your
//                     authenticator app.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-2">
//                 <button
//                   onClick={handleClose}
//                   className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   I've saved my setup key
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default MfaSetup;
