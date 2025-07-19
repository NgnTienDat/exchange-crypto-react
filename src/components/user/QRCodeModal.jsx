import React from "react";

const QRCodeModal = ({ onClose, onNext, secretImageUri }) => {

  console.log("imageUri: ", secretImageUri)
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-2xl p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-white text-3xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Link an Authenticator</h2>
        <p className="text-gray-400 mb-4">
          Scan this QR code in the authenticator app
        </p>

        <div className=" p-4 rounded-xl flex justify-center mt-7 mb-4">
          <img
            src={secretImageUri}
            alt="QR Code"
            className="w-[200px] h-[200px] rounded-xl"
          />
        </div>

        <button
          onClick={onNext}
          className="w-full mt-10 bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
