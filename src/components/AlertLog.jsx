import { useStore } from '../store/useStore';
import { AlertTriangle, Snowflake, CheckCircle } from 'lucide-react';

export default function AlertLog() {
  // Pull just the alerts array from our global store
  const { alerts } = useStore();

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-xl mt-8">
      <h3 className="text-slate-500 font-medium mb-4 uppercase tracking-wider text-sm">System Incident Log</h3>

      {alerts.length === 0 ? (
        // What to show when everything is perfect
        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
          <CheckCircle className="w-12 h-12 mb-3 text-emerald-400" />
          <p className="font-medium">System Stable. No thermal anomalies detected.</p>
        </div>
      ) : (
        // What to show when things go wrong
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              // Dynamically change colors: Red for heat spikes, Blue for freezing drops
              className={`flex items-start p-4 rounded-xl border ${
                alert.type === 'high' 
                  ? 'bg-red-50 border-red-100 text-red-800' 
                  : 'bg-blue-50 border-blue-100 text-blue-800'
              }`}
            >
              <div className="mr-4 mt-0.5">
                {alert.type === 'high' ? (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                ) : (
                  <Snowflake className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{alert.message}</p>
                <p className="text-xs opacity-70 mt-1">Logged at {alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}