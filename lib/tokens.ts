import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    const exsisitingToken = await getVerificationTokenByEmail(email);

    if (exsisitingToken) {
        await db.verficationToken.delete({
            where: {
                id: exsisitingToken.id,
            },
        }); 
    }

    const verficationToken = await db.verficationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    return verficationToken;
};