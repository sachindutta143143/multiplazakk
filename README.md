# Multi Plaza Website — Railway Ready

This is a static HTML/CSS/JS website with a tiny Node.js server so it can be deployed directly on Railway.

## Railway deployment

### Option 1 — GitHub (recommended)
1. Create a new GitHub repository.
2. Upload **all files inside this folder** (not the outer folder itself).
3. In Railway, create a new project → **Deploy from GitHub Repo**.
4. Select the repository.
5. Railway will detect Node.js and run `npm start`.
6. After deployment, open **Settings → Networking → Generate Domain**.

### Option 2 — Upload repository
If your Railway interface supports repository/file upload, upload the complete project with `package.json`, `server.js`, `index.html`, `style.css`, `script.js`, and `assets/`.

## Important
- Do not delete `package.json` or `server.js`.
- The server automatically uses Railway's `$PORT`.
- You can replace the YouTube video URL in `index.html` later.
