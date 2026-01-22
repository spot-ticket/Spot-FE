#!/bin/bash

echo "=== 기존 컨테이너 종료 및 삭제 ==="
docker rm -f spot-fe 2>/dev/null || true

echo "=== Spot-FE 빌드 및 실행 ==="
cd docker compose up --build -d
cd ..

echo "=== 실행 중인 컨테이너 확인 ==="
docker ps --filter "name=spot-fe"

echo "=== 로그 확인 ==="
mkdir -p ./logs
docker logs -f spot-fe 2>&1 | tee -a "./logs/log_$(date +%Y%m%d_%H%M%S).log"
