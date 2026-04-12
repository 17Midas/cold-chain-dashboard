import { useStore } from './store/useStore';
// IMPORT THE NEW CHART
import TemperatureChart from './components/TemperatureChart';

function App() {
  const { currentTemp, systemStatus, setTemperature, upperThreshold, lowerThreshold } = useStore();

  return (
    <div className="min-h-screen bg-slate-500 flex flex-col items-center py-12 px-4 gap-8 font-sans">
      <h1 className="text-4xl font-bold text-slate-800 tracking-wide">
        Cold-Chain Command
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        {/* The KPI Card (We made it adapt to the new layout) */}
        <div className="bg-cyan p-8 rounded-2xl border border-slate-200 shadow-xl text-center w-full lg:w-1/3 flex flex-col justify-center">
          <h2 className="text-sm mb-2 text-slate-400 font-medium tracking-wider uppercase">Live Temperature</h2>
          <p className={`text-6xl font-mono font-bold tracking-tighter transition-colors duration-300 ${
            systemStatus === 'Critical' ? 'text-red-500' : 'text-emerald-400'
          }`}>
            {currentTemp.toFixed(1)}°C
          </p>
          <div className="mt-4 flex justify-between text-xs font-medium text-slate-500 bg-slate-950 px-4 py-2 rounded-lg">
            <span>Min: {lowerThreshold}°C</span>
            <span>Max: {upperThreshold}°C</span>
          </div>

          {/* Manual Controls */}
          <div className="flex gap-2 mt-6">
            <button onClick={() => setTemperature(currentTemp + 0.8)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-lg transition-colors border border-slate-700">+ Heat</button>
            <button onClick={() => setTemperature(currentTemp - 0.8)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-lg transition-colors border border-slate-700">- Cool</button>
          </div>
        </div>

        {/* THE NEW CHART */}
        <div className="w-full lg:w-2/3">
           <TemperatureChart />
        </div>
      </div>
    </div>
  );
}

export default App;