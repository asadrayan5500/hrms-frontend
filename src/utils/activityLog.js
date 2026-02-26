// Simple in-memory activity log
let activityLog = [];

export const addActivityLog = (action, details, userId = "System") => {
  const log = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action,
    details,
    userId,
  };
  activityLog.unshift(log); // Add to beginning
  // Keep only last 100 entries
  if (activityLog.length > 100) {
    activityLog = activityLog.slice(0, 100);
  }
  return log;
};

export const getActivityLogs = (limit = 50) => {
  return activityLog.slice(0, limit);
};

export const clearActivityLogs = () => {
  activityLog = [];
};
