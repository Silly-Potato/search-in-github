import { Router } from "express";
import { PrismaClient } from "prisma";
const fetch = require('node-fetch');

const api = Router();
const prisma = new PrismaClient();

api.get("/:username", async(request, response) => {
  const { username } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      login:username
    }
  });

  console.log("toto");
  console.log(user);
  response.json({
    data: { username },
  });
});

export default api;
