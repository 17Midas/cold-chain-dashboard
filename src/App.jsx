import { useStore } from './store/useStore';

function App() {
  // We "hook" into our global store to grab exactly what we need
  const { currentTemp, systemStatus, setTemperature, upperThreshold, lowerThreshold } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-slate-100 tracking-wide">
        Cold-Chain Command
      </h1>

      {/* The KPI Card */}
      <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 shadow-2xl text-center w-96">
        <h2 className="text-xl mb-4 text-slate-400 font-medium tracking-wider uppercase">Live Temperature</h2>
        
        {/* Dynamic Styling based on the system status! */}
        <p className={`text-7xl font-mono font-bold tracking-tighter transition-colors duration-300 ${
          systemStatus === 'Critical' ? 'text-red-500' : 'text-emerald-400'
        }`}>
          {currentTemp.toFixed(1)}°C
        </p>
        
        <div className="mt-6 flex justify-between text-sm font-medium text-slate-500 bg-slate-950 px-4 py-2 rounded-lg">
          <span>Lower Bound: {lowerThreshold}°C</span>
          <span>Upper Bound: {upperThreshold}°C</span>
        </div>
      </div>

      {/* Manual Override Controls for Testing */}
      <div className="flex gap-4">
        <button 
          onClick={() => setTemperature(currentTemp + 0.5)}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors border border-slate-700"
        >
          + Heat Unit
        </button>
        <button 
          onClick={() => setTemperature(currentTemp - 0.5)}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-colors border border-slate-700"
        >
          - Cool Unit
        </button>
      </div>
    </div>
  );
}

export default App;