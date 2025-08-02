const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
