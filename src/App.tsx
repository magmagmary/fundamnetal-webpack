const App = () => (
  <div className="w-screen h-screen bg-slate-300 text-slate-900
                  text-3xl flex flex-col items-center justify-center">
    <span className="mb-4">  Hello From Webpack</span>

    <p className="text-sm text-gray-500">{`developed by ${process.env.REACT_APP_NAME}`}</p>
  </div>
);

export default App;
