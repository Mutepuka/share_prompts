import { connectToDB } from '@utils/database';

export const POST = async (req)=>{
    //get information that you passed in you post request
    const { userId, prompt, tag} = await req.json();
}