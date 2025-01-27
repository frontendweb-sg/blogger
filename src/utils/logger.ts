// utils/logger.js

import { EventType } from "./types";

// Utility function to log events with a consistent format
export function logEvent(eventType: EventType, data = {}) {
  const timestamp = new Date().toISOString(); // Standard timestamp format
  const logMessage = {
    timestamp,
    eventType,
    ...data, // Attach any additional data passed to the log
  };

  // Log to console (can be customized based on environment)
  if (process.env.NODE_ENV === "development") {
    console.log(JSON.stringify(logMessage, null, 2)); // Pretty-print in development
  } else {
    // In production, you may want to send logs to an external service or save to a file
    // Example: send logs to an external logging service like Sentry, LogRocket, or a custom server
    // For example, logging to an external service (uncomment and replace with actual service):
    // sendLogToService(logMessage);
    // Or you could save logs to a file (with something like `fs.appendFileSync` in Node.js):
    // const fs = require('fs');
    // fs.appendFileSync('logs/app.log', JSON.stringify(logMessage) + '\n');
    // 1. Sentry – Captures errors, exceptions, and events.
    // 2. LogRocket – Records user sessions and replays bugs.
    // 3. Winston – A popular logging library for Node.js that supports file logging, log levels, and external transport integration.
  }
}
