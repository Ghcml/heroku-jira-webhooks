const rp = require('request-promise');

class JiraService {

  constructor() {
    this.restApiBase = `https://${process.env.JIRA_SITE}.atlassian.net/rest/api/2`;
    this.restDevApiBase = `https://${process.env.JIRA_SITE}.atlassian.net/rest/dev-status/1.0`;
  }

  getIssuePR(issueId) {
    const resourcePath = `/issue/detail?issueId=${issueId}&applicationType=github&dataType=pullrequest`;

    return rp(this.restDevApiBase + resourcePath, {
      method: 'GET',
      auth: {
        user: process.env.JIRA_USER,
        pass: process.env.JIRA_PASS
      },
      json: true
    });
  }

}

module.exports = JiraService;
