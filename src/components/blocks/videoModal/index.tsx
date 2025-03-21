import React, { useEffect } from 'react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId }) => {
    useEffect(() => {
        // Load the Wistia scripts
        const script1 = document.createElement('script');
        script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
        script1.async = true;

        const script2 = document.createElement('script');
        script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        // Cleanup scripts on unmount
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, [videoId]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative pt-[56.25%]">
                    <div className={`wistia_embed wistia_async_${videoId} seo=true videoFoam=true absolute inset-0 w-full h-full playerColor=0c193a`}>
                        <div className="wistia_swatch absolute inset-0 w-full h-full opacity-0 overflow-hidden transition-opacity duration-200">
                            <img
                                src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`}
                                style={{ filter: 'blur(0.3125rem)', objectFit: 'contain' }}
                                alt=""
                                aria-hidden="true"
                                onLoad={(e) => {
                                    const parentNode = (e.target as HTMLImageElement).parentNode as HTMLElement;
                                    if (parentNode) {
                                        parentNode.style.opacity = '1';
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="absolute text-gray-600 rounded-4xl bg-white w-10 h-10 cursor-pointer flex items-center justify-center top-[-2.8125rem] right-[-2.8125rem] transition-all duration-200 hover:bg-primary-dark hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default VideoModal;
