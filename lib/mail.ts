import {Resend} from "resend";
import { TEST_WEBSITE_LINK, PROD_WENSTE_LINK } from "@/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    // For Test Deployment
    // const confirmLink = `${TEST_WEBSITE_LINK}/auth/new-verification?token=${token}`;

    // For Production Deployment
    const confirmLink = `${PROD_WENSTE_LINK}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email address",
        html: `<p>Please click the link below to verify your email address:</p>
        <p><a href="${confirmLink}">${confirmLink}</a></p>`,
    });

}