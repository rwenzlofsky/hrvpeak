import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function storeToken(user_id,token) {
    console.log('Storing token')
    const a = await prisma.token.create({
      data: {
        user_id: user_id,
        token: token
      }
    })
  };