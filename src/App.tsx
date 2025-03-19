import useToast from "./components/toast/useToast";

function App() {
  const { showToastMessage } = useToast();

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mb-4 text-xl font-bold">My Toast</h2>
      <div className="flex flex-col space-y-2">
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition hover:bg-blue-600"
          onClick={() => showToastMessage("Test toast message.")}
        >
          Open First Toast
        </button>
        <button
          className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md transition hover:bg-green-600"
          onClick={() =>
            showToastMessage(
              "Your 'Purchase Trade Contract' has been successfully canceled.",
              "bottom-left",
              null,
            )
          }
        >
          Open Second Toast
        </button>
      </div>
    </div>
  );
}

export default App;
