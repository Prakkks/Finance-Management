'use server';

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signIns = async ( {email,password}:signInProps) => 
{
    try {

        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email,password);
        console.log( 'from signin=', parseStringify(response));
        return parseStringify(response);
    }
    catch(error)
    {
        console.error('Error:', error);
    }
}

export const signUps = async (userData: SignUpParams) => 
{

    const {email, password, lastname, firstname} = userData;
    try {
  const { account } = await createAdminClient();

  const newUserAccount = await account.create(ID.unique(), email, password,`${firstname} ${lastname}`);
  const session = await account.createEmailPasswordSession(userData.email, userData.password);

  (await cookies()).set("appwrite-session", session.secret, {
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
    const user = await account.get();

    // const result = await account.get();
    // const user = await getUserInfo({ userId: result.$id});
    console.log('User value from  getloggeduser',parseStringify(user));
    return parseStringify(user);
  } catch (error) {
    console.log(error)
    return null;
  }
  }

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}  

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
}
