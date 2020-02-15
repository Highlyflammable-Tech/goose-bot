const fetch = require('node-fetch');
module.epxorts = {
  close,
  comment,
}

function comment(event, msg, confg) {
  fetch(event.payload.issue.comments_url, {
      method: "post",
      body: JSON.stringify({
        "body": "We do not allow mod requests that are considered destructive or malicious. Sorry!"
      }),
      headers: {
        "Authorization": authorization
      }
    })
    .then(res => {
      if (res.status !== 200) throw "Unable to comment";
    })
}

function close(event, config) {
  fetch(event.payload.issue.url, {
      method: "patch",
      body: JSON.stringify({
        "state": "closed"
      }),
      headers: {
        "Authorization": "token " + config.github_token
      }
    })
    .then(res => {
      if (res.status !== 200) throw "Unable to close";
    })
}
