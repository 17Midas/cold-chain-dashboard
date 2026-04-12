import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useStore } from '../store/useStore';

export default function TemperatureChart() {
  // Grab the history and thresholds from our Zustand brain
  const { tempHistory, upperThreshold, lowerThreshold } = useStore();

  return (
    <div className="w-full h-80 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl mt-8">
      <h3 className="text-slate-400 font-medium mb-4 uppercase tracking-wider text-sm">Live Thermal Feed</h3>
      
      {/* ResponsiveContainer makes the chart auto-fit our div */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={tempHistory}>
          {/* The Grid lines behind the chart */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          {/* X and Y Axes styling */}
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickMargin={10} />
          <YAxis stroke="#64748b" fontSize={12} domain={[0, 10]} tickCount={6} />
          
          {/* The beautiful hover tooltip */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ color: '#38bdf8' }}
          />

          {/* DANGER ZONES: These draw horizontal red lines at our exact threshold limits! */}
          <ReferenceLine y={upperThreshold} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Upper Limit', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={lowerThreshold} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Lower Limit', fill: '#ef4444', fontSize: 12 }} />

          {/* The actual data line */}
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="#38bdf8" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#0f172a', stroke: '#38bdf8', strokeWidth: 2 }} 
            activeDot={{ r: 6, fill: '#38bdf8' }} 
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}