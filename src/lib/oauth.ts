"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

import { createAdminClient } from "./appwrite";

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const nextHeaders = await headers();
  const origin = nextHeaders.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/api/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const nextHeaders = await headers();
  const origin = nextHeaders.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}
