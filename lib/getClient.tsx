import React from "react";
import { MongoClient } from "mongodb";

const getClient = async () => {
	const client = await MongoClient.connect(
		"mongodb+srv://kuba:kuba@authentication-practice.1hcb01b.mongodb.net/test"
	);

	return client;
};

export default getClient;
