'use server';

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const signIns = async ( ) => 
{
    try {
// fedtch
    }
    catch(error)
    {
        console.error('Error:', error);
    }
}

export const signUps = async (userData: SignUpParams) => 
{
    try {
    
  const { account } = await createAdminClient();

  const newUserAccount = await account.create(ID.unique(), userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);
  const session = await account.createEmailPasswordSession(userData.email, userData.password);

  (await cookies()).set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return parseStringify(newUserAccount);
    }
    catch(error)
    {
        console.error('Error:', error);
    }
}



export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }
  