// Metrics Tracking Implementation
// Level 2 RSI Capability

import fs from 'fs';
import path from 'path';

const METRICS_DIR = 'metrics';
const SESSION_FILE = `${METRICS_DIR}/session.json`;
const HISTORY_FILE = `${METRICS_DIR}/history.jsonl`;
const SUMMARY_FILE = `${METRICS_DIR}/summary.json`;

interface SessionMetrics {
  sessionId: string;
  startTime: string;
  model: string;
  channel: string;
  operations: number;
  successes: number;
  failures: number;
  tokensUsed: number;
  selfModifies: number;
  selfModifySuccesses: number;
}

interface MetricEntry {
  timestamp: string;
  type: 'session_start' | 'session_end' | 'self_modify' | 'operation' | 'daily_summary';
  sessionId?: string;
  data: Record<string, unknown>;
}

// Initialize metrics directory
function initMetrics() {
  if (!fs.existsSync(METRICS_DIR)) {
    fs.mkdirSync(METRICS_DIR, { recursive: true });
  }
}

// Track session start
export function trackSessionStart(sessionId: string, model: string, channel: string): SessionMetrics {
  initMetrics();
  
  const metrics: SessionMetrics = {
    sessionId,
    startTime: new Date().toISOString(),
    model,
    channel,
    operations: 0,
    successes: 0,
    failures: 0,
    tokensUsed: 0,
    selfModifies: 0,
    selfModifySuccesses: 0
  };
  
  fs.writeFileSync(SESSION_FILE, JSON.stringify(metrics, null, 2));
  logMetric({ timestamp: new Date().toISOString(), type: 'session_start', sessionId, data: { model, channel } });
  
  return metrics;
}

// Track operation completion
export function trackOperation(success: boolean, tokens = 0, durationMs = 0) {
  const metrics = getCurrentSessionMetrics();
  if (!metrics) return;
  
  metrics.operations++;
  if (success) {
    metrics.successes++;
  } else {
    metrics.failures++;
  }
  metrics.tokensUsed += tokens;
  
  fs.writeFileSync(SESSION_FILE, JSON.stringify(metrics, null, 2));
  logMetric({
    timestamp: new Date().toISOString(),
    type: 'operation',
    sessionId: metrics.sessionId,
    data: { success, tokens, durationMs }
  });
}

// Track self-modify event
export function trackSelfModify(success: boolean, durationMs = 0) {
  const metrics = getCurrentSessionMetrics();
  if (!metrics) return;
  
  metrics.selfModifies++;
  if (success) {
    metrics.selfModifySuccesses++;
  }
  
  fs.writeFileSync(SESSION_FILE, JSON.stringify(metrics, null, 2));
  logMetric({
    timestamp: new Date().toISOString(),
    type: 'self_modify',
    sessionId: metrics.sessionId,
    data: { success, durationMs }
  });
}

// Get current session metrics
export function getCurrentSessionMetrics(): SessionMetrics | null {
  if (!fs.existsSync(SESSION_FILE)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(SESSION_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

// Log to history
function logMetric(entry: MetricEntry) {
  fs.appendFileSync(HISTORY_FILE, JSON.stringify(entry) + '\n');
}

// Generate daily summary
export function generateDailySummary(): Record<string, unknown> {
  const summary = {
    date: new Date().toISOString().split('T')[0],
    totalSessions: 0,
    totalOperations: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    totalSelfModifies: 0,
    totalSelfModifySuccesses: 0,
    overallSuccessRate: 0
  };
  
  if (fs.existsSync(HISTORY_FILE)) {
    const lines = fs.readFileSync(HISTORY_FILE, 'utf-8').split('\n').filter(Boolean);
    const today = new Date().toISOString().split('T')[0];
    
    let sessionStarts = 0;
    
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.timestamp.startsWith(today)) {
          if (entry.type === 'session_start') sessionStarts++;
          if (entry.type === 'operation' && entry.data.success) summary.totalSuccesses++;
          if (entry.type === 'operation' && !entry.data.success) summary.totalFailures++;
          if (entry.type === 'self_modify') {
            summary.totalSelfModifies++;
            if (entry.data.success) summary.totalSelfModifySuccesses++;
          }
        }
      } catch {
        // Skip malformed lines
      }
    }
    
    summary.totalSessions = sessionStarts;
    summary.totalOperations = summary.totalSuccesses + summary.totalFailures;
    summary.overallSuccessRate = summary.totalOperations > 0 
      ? (summary.totalSuccesses / summary.totalOperations) * 100 
      : 0;
  }
  
  fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summary, null, 2));
  logMetric({ timestamp: new Date().toISOString(), type: 'daily_summary', data: summary });
  
  return summary;
}

// Export for use in other modules
export default {
  trackSessionStart,
  trackOperation,
  trackSelfModify,
  getCurrentSessionMetrics,
  generateDailySummary
};
