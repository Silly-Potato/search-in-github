import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const api = Router();
const prisma = new PrismaClient();

const fetch = require('node-fetch');

api.get("/:username", async (request, response) => {
  const { username } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      login: username
    }
  });

  if (user == null) {
    try {
      console.log(`fetch: https://api.github.com/users/${username}`);
      console.log("fetching user from github...");
      const response = await fetch(`https://api.github.com/users/${username}`);
      const body = await response.json();
      console.log("Body: " + body.message);
      if (body.message == "Not Found") {
        res.json({
          data: {
            user: "User do not exist !"
          }
        });
      } else {
        console.log("creating user in prisma...")
        await prisma.user.create({
          data: {
            login: body.login,
            node_id: body.node_id,
            avatar_url: body.avatar_url,
            gravatar_id: body.gravatar_id,
            url: body.url,
            html_url: body.html_url,
            followers_url: body.followers_url,
            following_url: body.following_url,
            gists_url: body.gists_url,
            starred_url: body.starred_url,
            subscriptions_url: body.subscriptions_url,
            organizations_url: body.organizations_url,
            repos_url: body.repos_url,
            events_url: body.events_url,
            received_events_url: body.received_events_url,
            type: body.type,
            site_admin: body.site_admin,
            name: body.name,
            company: body.company,
            blog: body.blog,
            location: body.location,
            email: body.email,
            hireable: body.hireable,
            bio: body.bio,
            twitter_username: body.twitter_username,
            public_repos: body.public_repos,
            public_gists: body.public_gists,
            followers: body.followers,
            following: body.following,
            created_at: body.created_at,
            updated_at: body.updated_at
          }
        })
        response.json({
          data: { data }
        })
      }
    }
    catch {
      console.log("Error, try again later.")
      response.json({
        data: {
          message: "Limited github API rate, try again later."
        }
      })
    }
  }
  else {
    response.json({
      data: { user }
    })
  }
});

export default api;