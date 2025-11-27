import { DefaultSession } from "next-auth";
import { Role, Region } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      region?: Region | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    region?: Region | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    region?: Region | null;
  }
}

