import React from 'react';
import ReactLoading from 'react-loading';

const LoadingModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 w-full h-full">
            <ReactLoading type={'spin'} color={"#0027d5"} height={100} width={100} />
        </div>
    );
};

export default LoadingModal;
