import React, { useState } from 'react';
import { ChevronLeft, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QRCodeModal from '../../../components/user/QRCodeModal';
import useTfa from '../../../hooks/useTfa';
import VerifyCodeModal from '../../../components/user/VerifyCodeModal';
import useUser from '../../../hooks/useUser';
import { getDeviceId } from '../../../utils/helper';

const TwoFactorAuthenticate = () => {

    const [step, setStep] = useState("none")
    const [qrData, setQrData] = useState("");
    const { enableTfa } = useTfa();
    const navigate = useNavigate()
    const {user, isLoading} = useUser();

    const [pendingUserId, setPendingUserId] = useState(user?.id || null);
    const deviceId = getDeviceId(user?.email || "");


    


    const handleBack = () => {
        navigate("/my/security")
    };

    const handleQrNext = () => {
        setStep("verify");
    }

    const handleCloseModal = () => {
        setStep("none");
    }


    const handleEnableAuth = () => {
        enableTfa(undefined, {
            onSuccess: (data) => {
                setQrData(data);
                setStep("qr");
            },
            onError: (error) => {
                console.error("Enable 2FA failed", error)
            },
        });
    };

    return (
        <div className='bg-gray-900 text-white'>
            <div className="p-6">
                <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-lg font-medium">Security</span>
                </button>
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold mb-12">Authenticator App</h1>

                    <div className="mb-8">
                        <div className="w-24 h-24 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Smartphone className="w-12 h-12 text-gray-400" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Enjoy faster login</h2>

                    <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                        Instead of waiting for text messages, get verification codes from an
                        authenticator app like Google Authenticator/Microsoft Authenticator. It
                        works even if your phone is offline.
                    </p>

                    <button
                        onClick={handleEnableAuth}
                        className="w-[80%] bg-amber-300 text-black font-semibold py-3 px-6 rounded-lg
                         hover:bg-amber-400 transition-colors mb-4 cursor-pointer"
                    >
                        Enable Authenticator App
                    </button>

                    <button className="text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer">
                        Download Authenticator App
                    </button>
                </div>
            </div>
            {step === "qr" && (
                <QRCodeModal
                    secretImageUri={qrData?.secretImageUri}
                    onClose={handleCloseModal}
                    onNext={handleQrNext} />
            )}
            {step === "verify" && (
                <VerifyCodeModal onClose={handleCloseModal}
                    userId={pendingUserId}
                    deviceId={deviceId}
                />
            )}
        </div>
    );
};

export default TwoFactorAuthenticate;