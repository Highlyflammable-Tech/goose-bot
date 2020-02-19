module.exports = {
  prefix: "prefix_here",
  owner_id: "owner_id",
  db_token: "mongodb_url",
  dev_mode: true,//used to change between bot tokens and other things
  //true = will use dev Bot
  //false = will use main bot
  token: {
    main: "Main_bot_token_here",
    dev: "dev_bot_here",
  },
  suggestion_channel:"channel_id",//this will be used for suggestions
  github_token:"user_token",//this is used for all of the request to github  how to get ->(https://github.com/settings/tokens)
  webhook_secret:"secret",//this is used to make sure that the webhooks come from github
  trello:{ //used for suggestions
    key:"",//the token from trello.com/app-key
    user_token:""// the token from connecting to account
  }
}
