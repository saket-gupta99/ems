function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-5 border border-red-500 rounded-lg">
      <h2 className="text-red-600 font-bold text-lg">Something went wrong!</h2>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
