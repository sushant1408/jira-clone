"use server";

import { createSessionClient } from "@/lib/appwrite";

const getCurrent = async () => {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (error) {
    return null;
  }
};

export { getCurrent };
