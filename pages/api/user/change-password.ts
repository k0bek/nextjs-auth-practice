import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import getClient from "@/lib/getClient";
import verifyPassword from "@/lib/verifyPassword";
import hashPassword from "@/lib/hashPassword";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PATCH") {
		return;
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({ message: "Session doesn't exist" });
		return;
	}

	const currentEmail = session?.user?.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const client = await getClient();
	const db = client.db().collection("users");

	const loggedUser = await db.findOne({ email: currentEmail });

	if (!loggedUser) {
		res.status(404).json({ message: "User doesnt exist" });
	}

	const passwordsAreEqual = await verifyPassword(
		oldPassword,
		loggedUser?.password
	);

	if (!passwordsAreEqual) {
		res.status(403).json({ message: "Invalid password." });
		return;
	}

	const hashedPassword = await hashPassword(newPassword);

	const result = await db.updateOne(
		{ email: currentEmail },
		{ $set: { password: hashedPassword } }
	);

	res.status(201).json({ message: "Password updated correctly!" });
};

export default handler;
