import React from "react";
import { MongoClient } from "mongodb";

const getClient = async () => {
	const client = await MongoClient.connect(
		"mongodb+srv://kuba:kuba@cluster0.rlmfnev.mongodb.net/test"
	);

	return client;
};

export default getClient;
