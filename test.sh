#!/bin/bash

echo "=== 기존 컨테이너 종료 및 삭제 ==="
docker rm -f spot-fe-dev 2>/dev/null || true

echo "=== Spot-FE 개발 모드 실행 (로컬 변경 실시간 반영) ==="
docker compose up spot-fe-dev -d

echo "=== 실행 중인 컨테이너 확인 ==="
docker ps --filter "name=spot-fe-dev"

echo "=== 로그 확인 ==="
mkdir -p ./logs
docker logs -f spot-fe-dev 2>&1 | tee -a "./logs/log_$(date +%Y%m%d_%H%M%S).log"
