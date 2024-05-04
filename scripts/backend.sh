#!/bin/bash

set -e

cd /build/backend
cargo sqlx prepare
cargo build
cp /build/backend/target/debug/cashier-backend /app/cashier-backend
cd /app
cp /build/backend/Rocket.toml /app/Rocket.toml
/app/cashier-backend