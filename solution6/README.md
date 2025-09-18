# Scoreboard Module – API Service

This module implements a real-time leaderboard (top 10 user scores) and a secure webhook to increase user scores after an action is completed on a trusted platform.

## Goals

- Expose a public read API to fetch the top N scores and any user’s current score.
- Provide a **secure, idempotent** write endpoint to increase a user’s score.
- Push **live updates** to connected clients (web/mobile) when the leaderboard changes.
- Prevent malicious score inflation.

## High-Level Architecture

- **API Service (Node.js / Express / TypeScript)**  
  - Endpoints: `POST /actions/score-update`, `GET /leaderboard/top`, `GET /users/:id/score`
- **Postgres**: source of truth (`user_scores`, `score_events`)
- **Redis**: leaderboard ZSET, short-lived caches, idempotency keys and replay nonces
- **Realtime**: Socket.IO (or Server-Sent Events) to broadcast `leaderboard.updated` events
- **(Optional) Message Broker**: decouple write path from broadcasting at scale

### Data Model

- `user_scores(user_id PK, score BIGINT, updated_at)`
- `score_events(id UUID PK, user_id, action_id, points INT, reason TEXT, created_at TIMESTAMP)`
- Redis:  
  - `leaderboard:zset` (ZSET) – member: `user_id`, score: cumulative points  
  - `lb:top:10` – cached JSON of top 10 (TTL 1–3s)  
  - `idem:<idempotency-key>` – to prevent duplicates (TTL 24h)  
  - `nonce:<signature|timestamp>` – optional replay guard (TTL 10m)

### Realtime

- Clients connect via WebSocket (`/ws`) and subscribe to `leaderboard:updates`.  
- On score change, the service publishes an event with the latest top 10.

## API

### 1. Increase Score (Trusted Webhook)

    `POST /actions/score-update`

    Headers:
    - `X-Signature: sha256=<hex>` – HMAC-SHA256 over `"<timestamp>.<raw_body>"` using shared secret
    - `X-Timestamp: <epoch_ms>`
    - `Idempotency-Key: <uuid>`

    Body:
    ```json
    {
    "user_id": "u_123",
    "points": 15,
    "action_id": "quiz#2025-09-17",
    "reason": "Completed daily challenge"
    }

    Responses:

    200 OK – processed (or idempotent replay)
    401 Unauthorized – invalid signature / stale timestamp
    409 Conflict – duplicate action_id for the same user
    429 Too Many Requests – rate limited

### 2. Read Leaderboard
    
    `GET /leaderboard/top?limit=10`

    Response:

    {
        "limit": 10,
        "items": [
            { "user_id": "u_1", "score": 420 },
            { "user_id": "u_2", "score": 400 }
        ],
        "last_updated": "2025-09-18T07:00:00Z"
    }

### 3. Read User Score

    `GET /users/:id/score`

    Response:

    { "user_id": "u_123", "score": 1337, "updated_at": "2025-09-18T07:00:00Z" }

## Security

    Server-to-server only: the action platform calls the webhook, not browsers.
    HMAC verification: reject if signature mismatch or clock skew > 5 minutes.
    Idempotency: Idempotency-Key stored with SET NX in Redis (TTL 24h).
    Replay protection: timestamp check + short-lived nonce store.
    Business rules: per-action uniqueness (user_id + action_id), daily caps, point bounds.
    Rate limiting: per IP/app and per user.
    Secrets: stored in env, rotated regularly.

## Running Locally

    ```bash
    # Env
    cp .env.example .env
    # Required:
    # DATABASE_URL=postgres://...
    # REDIS_URL=redis://...
    # PORT
    # ACTION_WEBHOOK_SECRET=a_long_text_here

    docker compose up -d
    npm install
    npm run dev