# Metrics Tracking Skill

Tracks agent performance, session data, and self-modification outcomes.

## Files

- `metrics/session.json` - Current session metrics
- `metrics/history.jsonl` - Historical metrics (appended)
- `metrics/summary.json` - Aggregated daily summary

## Usage

### Track Session Start
```json
{
  "action": "session_start",
  "sessionKey": "optional-session-id",
  "model": "current-model",
  "channel": "telegram"
}
```

### Track Self-Modify Event
```json
{
  "action": "self_modify",
  "filePath": "path/to/file",
  "success": true,
  "durationMs": 1500
}
```

### Track Operation Outcome
```json
{
  "action": "operation",
  "name": "web_search",
  "success": true,
  "tokens": 1200,
  "durationMs": 800
}
```

### Get Summary
Returns current metrics summary.

## Cron Integration

Set up cron job to generate daily summaries:
```json
{
  "schedule": {"kind": "cron", "expr": "0 0 * * *", "tz": "America/Los_Angeles"},
  "payload": {"kind": "systemEvent", "text": "metrics:daily_summary"},
  "sessionTarget": "main"
}
```
