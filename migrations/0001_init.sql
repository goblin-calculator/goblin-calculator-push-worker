CREATE TABLE IF NOT EXISTS subscriptions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  farm_id       INTEGER NOT NULL,
  endpoint      TEXT NOT NULL UNIQUE,
  p256dh        TEXT NOT NULL,
  auth          TEXT NOT NULL,
  created_at    INTEGER NOT NULL,
  last_seen_at  INTEGER
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_farm ON subscriptions (farm_id);

CREATE TABLE IF NOT EXISTS farm_state (
  farm_id         INTEGER PRIMARY KEY,
  seen_json       TEXT NOT NULL DEFAULT '{}',
  last_synced_at  INTEGER
);
