import { create } from 'zustand';

export const useStore = create((set) => ({
  // --- 1. The Data (State) ---
  currentTemp: 4.0,           // Baseline safe temp
  upperThreshold: 8.0,        // Max safe limit
  lowerThreshold: 2.0,        // Min safe limit (freezing danger)
  systemStatus: 'Normal',     // Can be 'Normal' or 'Critical'
  alerts: [],                 // Array to hold our warning logs

  // --- 2. The Actions (Functions that change the data) ---
  setTemperature: (newTemp) => set((state) => {
    let newStatus = 'Normal';
    let newAlerts = [...state.alerts];

    // THE RULES: Check if the new temp breaches our safe zones
    if (newTemp > state.upperThreshold) {
      newStatus = 'Critical';
      newAlerts.unshift({ // unshift adds to the beginning of the array
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: `URGENT: Temp spiked to ${newTemp.toFixed(1)}°C (Upper Limit: ${state.upperThreshold}°C)`,
        type: 'high'
      });
    } else if (newTemp < state.lowerThreshold) {
      newStatus = 'Critical';
      newAlerts.unshift({
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: `URGENT: Temp dropped to ${newTemp.toFixed(1)}°C (Lower Limit: ${state.lowerThreshold}°C)`,
        type: 'low'
      });
    }

    // Memory Management: Keep only the last 10 alerts so the app doesn't crash over time
    if (newAlerts.length > 5) newAlerts.pop();

    // Save the new data to the global brain
    return {
      currentTemp: newTemp,
      systemStatus: newStatus,
      alerts: newAlerts
    };
  }),

  // Action to reset everything back to baseline
  resetSystem: () => set({ currentTemp: 4.0, systemStatus: 'Normal', alerts: [] })
}));