# Troubleshooting Guide - "Failed to Fetch" Error

## Problem
You're getting a "Failed to fetch" error when trying to run a prediction in the NOC-GPT dashboard.

---

## Step 1: Check if FastAPI Backend is Running

### On Windows (PowerShell):
```powershell
# Check if port 8000 is in use
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue

# If you see output, the backend is running on port 8000
```

### On Mac/Linux:
```bash
# Check if port 8000 is in use
lsof -i :8000

# If you see output, the backend is running
```

### Manual Check:
Open your browser and navigate to:
```
http://localhost:8000/docs
```

If you see a Swagger API documentation page, your FastAPI backend is running correctly.

---

## Step 2: Verify Environment Variable

### Check .env.local file exists:
In your project root (`C:\Users\chand\OneDrive\Desktop\network AI\NOC\project\frontend\`), you should have a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### If the file doesn't exist, create it:

**On Windows (PowerShell):**
```powershell
# Navigate to your frontend project
cd "C:\Users\chand\OneDrive\Desktop\network AI\NOC\project\frontend"

# Create the .env.local file
@"
NEXT_PUBLIC_API_URL=http://localhost:8000
"@ | Out-File -Encoding UTF8 ".env.local"
```

**On Windows (Command Prompt):**
```cmd
cd C:\Users\chand\OneDrive\Desktop\network AI\NOC\project\frontend
(echo NEXT_PUBLIC_API_URL=http://localhost:8000) > .env.local
```

---

## Step 3: Restart the Next.js Development Server

After creating/updating `.env.local`, you **MUST restart** the Next.js development server:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart it
pnpm dev
```

You should see output like:
```
▲ Next.js 16.2.0 (Turbopack)
- Local:        http://localhost:3000
- Environments: .env.local
```

If you see `.env.local` mentioned, the environment variable is being loaded correctly.

---

## Step 4: Check Browser Console for Detailed Errors

1. Open your browser at `http://localhost:3000`
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Try submitting the form again
5. Look for logs starting with `[v0]` - these show detailed error information

### Expected Debug Output (Successful):
```
[v0] Prediction started with API_BASE: http://localhost:8000
[v0] Request data: { problem_statement: "...", ... }
[v0] Fetching from URL: http://localhost:8000/predict
[v0] Response status: 200 OK
[v0] Prediction successful: { predicted_category: "...", ... }
```

### Common Error Outputs:

**Error: Network Failure**
```
[v0] Prediction error: TypeError: Failed to fetch
```
→ Backend is not running or not accessible

**Error: CORS Issue**
```
Access to XMLHttpRequest at 'http://localhost:8000/predict' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```
→ Backend CORS configuration issue

**Error: 404 Not Found**
```
[v0] API error: 404 Not Found
```
→ Endpoint `/predict` doesn't exist on backend

---

## Step 5: Verify Backend Health

In your browser, check if the health endpoint works:
```
http://localhost:8000/health
```

You should see a JSON response like:
```json
{"status": "healthy", "version": "1.0.0"}
```

If this fails, your backend has issues.

---

## Step 6: Test API Endpoint Directly

You can test the API endpoint using the Swagger interface:

1. Go to `http://localhost:8000/docs`
2. Find the `/predict` endpoint
3. Click "Try it out"
4. Enter test data:
```json
{
  "problem_statement": "Database connection timeout",
  "location": "Gurgaon 398",
  "process": "Amazon",
  "client": "Amazon",
  "hour": 12,
  "is_night": 0,
  "top_k": 3
}
```
5. Click "Execute"

If this works, the backend is fine. If it fails, fix your backend first.

---

## Common Issues and Solutions

### Issue 1: Backend not running
**Solution:** Start your FastAPI backend
```bash
# In your backend project directory
python -m uvicorn main:app --reload --port 8000
```

### Issue 2: Backend running on different port
**Solution:** Update `.env.local` to match your backend port
```
NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT_HERE
```

### Issue 3: Backend is remote/deployed
**Solution:** Update `.env.local` with your backend URL
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Issue 4: CORS errors
**Solution:** Ensure your FastAPI backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue 5: Environment variable not loading
**Solution:** 
- Make sure `.env.local` is in the root directory
- Restart the Next.js development server
- Check that the variable name is exactly `NEXT_PUBLIC_API_URL` (case-sensitive)

---

## Debugging Checklist

- [ ] FastAPI backend is running on `http://localhost:8000`
- [ ] Can access `http://localhost:8000/docs` in browser
- [ ] Can access `http://localhost:8000/health` in browser
- [ ] `.env.local` file exists in project root
- [ ] `.env.local` contains `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Next.js dev server shows `.env.local` is loaded
- [ ] Browser console shows `[v0]` debug logs
- [ ] Backend test via Swagger `/docs` works
- [ ] No CORS errors in browser console

---

## Still Not Working?

1. **Take a screenshot of the browser console** (F12 → Console tab)
2. **Check the backend logs** - see what errors it's showing
3. **Verify both servers are on the same machine** or can reach each other
4. **Try a different port** if 8000 is blocked by firewall

If you need more help, provide the full error message from the browser console.
