import React from 'react';
import LoadingComponent from '@/utils/LoadingComponent';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <LoadingComponent />
      <p className="mt-4 text-lg text-gray-700">Por favor, espera mientras cargamos tus datos...</p>
    </div>
  );
}

export default LoadingPage;
