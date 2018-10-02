const express = require('express');
const router = express.Router();

const {GitHubService, JiraService} = require('../services');

router.post('/webhooks/issues/:issueKey', function(req, res, next) {
  
  const changedItems = req.body.changelog.items;

  statusChange = changedItems.find(changedItem => changedItem.field == 'status');
  if (statusChange) {

    const jiraService = new JiraService();

    jiraService
      .getIssuePR(req.body.issue.id)
      .then(response => {

        if (response.errors.length) {
          return res.sendStatus(400);
        }

        const pullRequestId = response.detail[0].pullRequests[0].id.substr(1);
        const repoName = response.detail[0].branches[0].repository.name;
        const githubService = new GitHubService(process.env.GITHUB_ORG, repoName);
        
        githubService.updateStatusLabel(pullRequestId, statusChange.fromString, statusChange.toString);

      });

  }

  return res.sendStatus(200);
});

module.exports = router;
