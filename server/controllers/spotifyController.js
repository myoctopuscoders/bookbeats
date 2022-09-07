const fetch = require('node-fetch');
const CryptoJS = require('crypto-js')
const sha256 = require('crypto-js/sha256');
const spotifyController = {};

const client_id = process.env.SPOTIFY_CID;
const secret = process.env.SPOTIFY_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT;
const code_verifier = process.env.SPOTIFY_VERIFIER;


// using Spotify Auth code flow: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
// NOTE: something about the PKCE extension isn't working correctly
spotifyController.authorizeUser = (req, res, next) => {
  try {
    const scope = 'user-read-playback-position user-read-playback-state \
      streaming user-top-read user-library-read user-read-recently-played';
    const state = Math.random().toString();
    const code_challenge = sha256(code_verifier);
    const url = 'https://accounts.spotify.com/authorize?';
    const params = new URLSearchParams({
      client_id,
      response_type: 'code',
      redirect_uri,
      state,
      scope,
      show_dialog: false,
      // code_challenge,
      // code_challenge_method: 'S256'
    });

    res.locals.authURL = url + params;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.authorizeUser',
      error: err
    })
  }
}

spotifyController.getAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;
    const url = 'https://accounts.spotify.com/api/token';
    const cid64 = Buffer.from(client_id + ':' + secret).toString('base64');
    const formBody = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        // client_id,
        // code_verifier
    });
    const response = await fetch(url, {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + cid64,
      },
      json: true
    })
    const data = await response.json();
    res.locals.spotifyTokens = data;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in spotifyController.getAccessToken',
      error: err
    })
  }
}



module.exports = spotifyController;