# Jenkins Assignment Steps

## 1. Project Setup
- App code in `app/`
- Pipeline script in `.jenkins/Jenkinsfile`

## 2. GitHub
- Push the folder to GitHub.

## 3. Jenkins Job
- Parameterized build with `DEPLOY_VERSION`, `BRANCH_NAME`, `ENV`
- Use SSH credentials to deploy to a remote server (or local VPS)

## 4. Rollback Logic
- Before deployment, backup existing folder.
- On failure, restore from backup.

## 5. Run
- Trigger build with selected parameters.
- Watch logs and verify rollback on simulated failure.

## 6. Sample Output
- App runs at `http://your-server-ip:3000`

---
