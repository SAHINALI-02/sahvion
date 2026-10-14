import time
from collections import defaultdict
from fastapi import Request, HTTPException, status


class InMemoryRateLimiter:
    def __init__(self, requests_limit: int = 5, window_seconds: int = 60):
        self.requests_limit = requests_limit
        self.window_seconds = window_seconds
        self.records = defaultdict(list)

    def check_rate_limit(self, request: Request):
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        
        # Clean up old timestamps
        timestamps = self.records[client_ip]
        self.records[client_ip] = [t for t in timestamps if now - t < self.window_seconds]

        if len(self.records[client_ip]) >= self.requests_limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please wait a moment before transmitting another request.",
            )

        self.records[client_ip].append(now)


contact_rate_limiter = InMemoryRateLimiter(requests_limit=6, window_seconds=60)
newsletter_rate_limiter = InMemoryRateLimiter(requests_limit=6, window_seconds=60)
