# heroku-jira-webhooks

# Installation

1. Fork the project
2. Clone your fork
```bash
git clone https://github.com/{USERNAME}/heroku-jira-webhooks.git
```
3. Create heroku app (must login with ```bash heroku login ``` first)
```bash
heroku create
```
Copy the app url

4. Setup config variables. For example:
```bash
heroku config:set GITHUB_ORG=mercadolibre GITHUB_TOKEN=a77a7a7a7a77a7a7a7a JIRA_SITE=mercadolibre JIRA_USER=jirauser@domain.com JIRA_PASS=jirapassword
```
5. Create a Jira Webhook
```bash
url = url copied before + /jira/webhooks/issues/${issue.key} (For example: https://super-app.herokuapp.com/jira/webhooks/issues/${issue.key})
issue related event = issue.update
JQL Filter: project = yourProjectKey (For example: project = ODN)
```

6. For a new deploy just do:
```bash
git add file1, file2, ..., fileN
git commit -m "message"
git push heroku master
```
