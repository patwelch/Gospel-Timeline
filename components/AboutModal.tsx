import React from 'react';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full text-white" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">About This Application</h2>
        <p>This is placeholder text for the about section. Replace this with actual information about the application.</p>
        <button onClick={onClose} className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
