const octokit = require('@octokit/rest')()

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_TOKEN
});

class GitHubService {

  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  async updateStatusLabel(issueId, oldStatus, newStatus) {
    let newLabel;

    console.log(oldStatus, ' --> ', newStatus);

    const availableLabels = [
      'Status: REVIEW_REQUESTED',
      'Status: CHANGES_REQUESTED',
      'Status: TESTING'
    ];

    switch(newStatus) {
      case 'In Progress':
        if (oldStatus != 'TO DO') {
          newLabel = 'Status: CHANGES_REQUESTED';
        }
        break;
      
      case 'Review':
        newLabel = 'Status: REVIEW_REQUESTED';
        break;
      
      case 'Testing':
        newLabel = 'Status: TESTING';
        break;
      
      default:
        break;
    }

    if(newLabel) {
      console.log(`Adding label ${newLabel}`);
      await octokit.issues.addLabels({
        owner: this.owner,
        repo: this.repo,
        number: issueId,
        labels: [
          newLabel
        ]
      });
    }

    const labelsToDelete = availableLabels.filter(label => label != newLabel);
    
    await Promise.all(labelsToDelete.map(async label => {
      console.log(`Removing label ${label}`);
      try {
        await octokit.issues.removeLabel({
          owner: this.owner,
          repo: this.repo,
          number: issueId,
          name: label
        });
      } catch(err) {}
    }));
  }

}

module.exports = GitHubService;