import NextAuth, { Account, DefaultSession, User } from "next-auth"

declare module "next-auth" {
    type Session = {

        accessToken:  Account.accessToken
        userid: User.id
        user: User.email         


    }
}


