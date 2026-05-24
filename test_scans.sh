#!/bin/bash

API="http://localhost:8000/scan"

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Urgent: update your password immediately", "mode":"hybrid"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Verify your account now to avoid suspension", "mode":"ml"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Meeting agenda for tomorrow", "mode":"rule"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Click this link to reset your bank credentials", "mode":"hybrid"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Your invoice from accounting department", "mode":"ml"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Confirm your Microsoft account login immediately", "mode":"hybrid"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Security alert: unusual login attempt detected", "mode":"rule"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Your payroll document is ready", "mode":"ml"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Update your company VPN password", "mode":"hybrid"}'

curl -X POST $API -H "Content-Type: application/json" \
-d '{"text":"Lunch meeting rescheduled", "mode":"rule"}'