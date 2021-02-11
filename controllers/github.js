const asyncHandler = require("../middleware/async");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

//configure env
dotenv.config()
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
console.log({ client_id, client_secret });


const gettest = asyncHandler(async (req, res) => {
    res.send("Hello GitHub auth"); 
  });


  const login = asyncHandler(async (req, res) => {
    const redirect_uri = "http://localhost:4080/login/github/callback";
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=934c5ca91205cd9f81f4&redirect_uri=${redirect_uri}`
    );
  
  });

  const loginCallback = asyncHandler(async (req, res) => {
    const code = req.query.code;
    console.log(code)
    const access_token = await getAccessToken({ code, client_id, client_secret });
    const user = await fetchGitHubUser(access_token);
    if (user) {
      req.session.access_token = access_token;
      req.session.githubId = user.id;
      res.send('login successfull')
      res.redirect("/admin");
    } else {
      res.send("Login did not succeed!");
    }
  });

  const admin = asyncHandler( async (req, res) => {
    if (req.session && req.session.githubId === 1126497) {
      await fetch("http://localhost:3000/admin")
      //res.send("Hello Kevin <pre>" + JSON.stringify(req.session, null, 2));
      // Possible use "fetchGitHubUser" with the access_token
    } else {
      res.redirect("/login/github");
    }
  });

  const logOut = asyncHandler(async (req, res) => {
    if (req.session) req.session = null;
    res.redirect("/");
  });

  
  asyncHandler( async function getAccessToken({ code, client_id, client_secret }) {
    const request = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });
    const text = await request.text();
    const params = new URLSearchParams(text);
    return params.get("access_token");
  })
  
  asyncHandler( async function fetchGitHubUser(token) {
    const request = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + token
      }
    });
    return await request.json();
  }
)

module.exports = {
    gettest,
    login,
    loginCallback,
    admin,
    logOut
 };
  