import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import React, { useEffect, useState } from "react";

import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

const AuthPage = () => {
	const [isLoginForm, setIsLoginForm] = useState(false);
	const router = useRouter();
	const { data: session, status } = useSession();

	console.log(session);

	const changeFormHandler = () => {
		setIsLoginForm((prev) => {
			return !prev;
		});
	};

	useEffect(() => {
		if (session) {
			router.replace("/");
		} else {
		}
	}, [router, session]);

	return isLoginForm ? (
		<LoginForm onClick={changeFormHandler} />
	) : (
		<SignupForm onClick={changeFormHandler} />
	);
};

export default AuthPage;

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: { destination: "/" },
		};
	}

	return {
		props: {},
	};
}
