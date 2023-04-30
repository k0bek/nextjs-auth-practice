import getClient from "@/lib/getClient";
import verifyPassword from "@/lib/verifyPassword";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "username" },
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@user.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials) {
					throw new Error("Credentials not provided");
				}

				const client = await getClient();

				const userCollection = client.db().collection("users");

				const user = await userCollection.findOne({ email: credentials.email });

				if (!user) {
					client.close();
					throw new Error("There is no user with this email");
				}

				const isPasswordValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					client.close();
					throw new Error("Password is invalid");
				}

				client.close();

				return {
					email: user.email,
					username: user.username,
					id: user._id.toString(),
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
