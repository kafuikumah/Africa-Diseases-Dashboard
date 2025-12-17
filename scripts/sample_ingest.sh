#!/bin/bash

# Configuration
API_URL="http://localhost:3000/api/ingest"
API_KEY="my-secret-ingestion-key" # Match this with your .env INGESTION_API_KEY

echo "Sending data to $API_URL..."

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "countryIso": "NGA",
    "diseaseName": "Malaria",
    "year": 2025,
    "cases": 5000,
    "deaths": 120,
    "recovered": 4000
  }'

echo -e "\n\nDone."
