import { create } from 'zustand';

// Generate some initial dummy data so our chart isn't empty on load
const generateInitialHistory = () => {
  const history = [];
  let now = new Date();
  for (let i = 20; i > 0; i--) {
    let time = new Date(now.getTime() - i * 60000); // 1 minute intervals
    history.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: 4.0 + (Math.random() * 0.4 - 0.2) // Fluctuating around 4.0
    });
  }
  return history;
};

export const useStore = create((set) => ({
  // 1. The Data
  currentTemp: 4.0,           
  upperThreshold: 8.0,        
  lowerThreshold: 2.0,        
  systemStatus: 'Normal',     
  alerts: [],                 
  tempHistory: generateInitialHistory(), // NEW: Our historical data array

  // 2. The Actions
  setTemperature: (newTemp) => set((state) => {
    let newStatus = 'Normal';
    let newAlerts = [...state.alerts];
    
    // Create a new history point
    const newHistoryPoint = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temp: parseFloat(newTemp.toFixed(1))
    };

    // Add new point and keep only the last 20 readings (so the chart slides smoothly)
    const newHistory = [...state.tempHistory, newHistoryPoint].slice(-20);

    // Threshold Logic (Same as before)
    if (newTemp > state.upperThreshold) {
      newStatus = 'Critical';
      newAlerts.unshift({ id: Date.now(), time: new Date().toLocaleTimeString(), message: `URGENT: Temp spiked to ${newTemp.toFixed(1)}°C`, type: 'high' });
    } else if (newTemp < state.lowerThreshold) {
      newStatus = 'Critical';
      newAlerts.unshift({ id: Date.now(), time: new Date().toLocaleTimeString(), message: `URGENT: Temp dropped to ${newTemp.toFixed(1)}°C`, type: 'low' });
    }

    if (newAlerts.length > 10) newAlerts.pop();

    return {
      currentTemp: newTemp,
      systemStatus: newStatus,
      alerts: newAlerts,
      tempHistory: newHistory // NEW: Save the updated history
    };
  }),

  resetSystem: () => set({ 
    currentTemp: 4.0, 
    systemStatus: 'Normal', 
    alerts: [],
    tempHistory: generateInitialHistory()
  })
}));