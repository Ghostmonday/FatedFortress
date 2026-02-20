# API Documentation

Base URL: `http://localhost:3000`

---

## Health

### GET /health

Check API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-20T11:00:00.000Z"
}
```

---

## Actors

### POST /actor

Create or get an actor.

**Request:**
```json
{
  "actorId": "user-123"
}
```

**Response:**
```json
{
  "actor": {
    "actorId": "user-123",
    "currentRep": 1000,
    "stakedRep": 0,
    "currentXp": 0,
    "pendingXp": 0,
    "contributions": 0,
    "decayRate": 0,
    "lastActivity": null
  }
}
```

### GET /actor/:actorId

Get actor details by ID.

**Response:**
```json
{
  "actor": {
    "actorId": "user-123",
    "currentRep": 1000,
    "stakedRep": 100,
    "currentXp": 150,
    "pendingXp": 10,
    "contributions": 5,
    "decayRate": 0.05,
    "lastActivity": "2026-02-15T10:00:00.000Z",
    "roleHistory": "{\"BUILDER\":{\"BACKEND\":3}}",
    "successRate": "{\"BACKEND\":0.85}"
  }
}
```

---

## Tickets

### POST /ticket

Create a new ticket (work item).

**Request:**
```json
{
  "workPackageId": "wp-001",
  "title": "Fix login bug",
  "description": "Users cannot login with OAuth",
  "bondRequired": 100,
  "deadline": "2026-02-25T23:59:59Z"
}
```

**Response:**
```json
{
  "ticket": {
    "id": "ticket-uuid",
    "workPackageId": "wp-001",
    "title": "Fix login bug",
    "description": "Users cannot login with OAuth",
    "bondRequired": 100,
    "status": "OPEN",
    "deadline": "2026-02-25T23:59:59Z"
  }
}
```

### GET /tickets

List all open tickets.

**Response:**
```json
{
  "tickets": [
    {
      "id": "ticket-uuid",
      "workPackageId": "wp-001",
      "title": "Fix login bug",
      "bondRequired": 100,
      "deadline": "2026-02-25T23:59:59Z",
      "status": "OPEN"
    }
  ]
}
```

### POST /claim

Claim a ticket (requires sufficient REP stake).

**Request:**
```json
{
  "actorId": "user-123",
  "ticketId": "ticket-uuid"
}
```

**Response:**
```json
{
  "ticket": {
    "id": "ticket-uuid",
    "status": "CLAIMED",
    "claimedBy": "user-123",
    "claimedAt": "2026-02-20T11:00:00.000Z"
  }
}
```

**Errors:**
- `Ticket not found`
- `Ticket not available`
- `Actor not found`
- `Insufficient REP`

### POST /complete

Mark a ticket as completed (releases stake).

**Request:**
```json
{
  "ticketId": "ticket-uuid",
  "verifierId": "verifier-456"
}
```

**Response:**
```json
{
  "ticket": {
    "id": "ticket-uuid",
    "status": "COMPLETED",
    "completedAt": "2026-02-20T14:00:00.000Z"
  }
}
```

---

## Leaderboard

### GET /leaderboard

Get top 50 contributors by XP.

**Response:**
```json
{
  "leaderboard": [
    {
      "actorId": "user-123",
      "currentRep": 1000,
      "currentXp": 500,
      "contributions": 25
    }
  ]
}
```

---

## Administration

### POST /admin/mint

Mint REP tokens (development only).

**Request:**
```json
{
  "actorId": "user-123",
  "amount": 1000
}
```

**Response:**
```json
{
  "success": true,
  "actor": {
    "actorId": "user-123",
    "currentRep": 2000
  }
}
```

---

## Webhooks

### POST /webhooks/github

Receive GitHub events (push, PR, review).

**Headers:**
- `X-Hub-Signature-256`: HMAC signature for verification

**Request Body:** GitHub event payload

**Response:**
```json
{
  "success": true,
  "eventsProcessed": 3
}
```

---

## Ticket Status Values

| Status | Description |
|--------|-------------|
| `OPEN` | Available for claiming |
| `CLAIMED` | Has been claimed, work in progress |
| `COMPLETED` | Work finished and verified |
| `FORFEITED` | Deadline missed, stake slashed |
| `CANCELLED` | Ticket cancelled |

## REP (Reputation Points)

| Field | Description |
|-------|-------------|
| `currentRep` | Liquid REP (available to stake) |
| `stakedRep` | Locked REP (currently bonded to tickets) |

## XP (Experience Points)

| Field | Description |
|-------|-------------|
| `currentXp` | Confirmed XP from verified contributions |
| `pendingXp` | XP awaiting verification |
| `execution` | XP from BUILDER actions |
| `collaboration` | XP from ARCHITECT actions |
| `judgment` | XP from GUARDIAN (verification) actions |
| `roleHistory` | Per-role, per-domain activity counts |
| `successRate` | Success rate per domain (0.0 - 1.0) |
