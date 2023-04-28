import getClient from "@/lib/getClient";
import hashPassword from "@/lib/hashPassword";
import { NextApiRequest, NextApiResponse } from "next/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return;
	}

	const { username, email, password } = req.body;

	const client = await getClient();

	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: "User already exists" });
		return;
	}

	const hashedPassword = await hashPassword(password);

	const result = await db.collection("users").insertOne({
		email,
		password: hashedPassword,
		username,
	});

	res.status(201).json({ message: "User created properly!" });
};

export default handler;
