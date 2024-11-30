import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // This is a mock implementation. Replace with actual authentication
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: credentials.email,
            name: "Test User",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    // signUp: '/auth/signup',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };