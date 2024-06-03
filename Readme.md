# Run
```bash
docker compose up -d
npm start
```
# Endpoints
```bash
curl -X POST -H "Content-Type: application/json" -d '{"amountToBeSorted": 3}' http://localhost:3000/action/start
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{"id": "665bc369d655cca3f39e428c"}' http://localhost:3000/action/stop
```