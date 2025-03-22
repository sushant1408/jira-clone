"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

import { AUTH_COOKIE } from "./constants";

const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const nextCookies = await cookies();
    const session = nextCookies.get(AUTH_COOKIE);
    
    if (!session) {
      return null;
    }
    
    client.setSession(session.value);
    const account = new Account(client);
    
    return await account.get();
  } catch (error) {
    return null;
  }
};

export { getCurrent };
