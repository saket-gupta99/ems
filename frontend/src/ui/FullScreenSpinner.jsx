import Spinner from "./Spinner";

function FullScreenSpinner() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner size={60} borderWidth={6} />
    </div>
  );
}

export default FullScreenSpinner;
