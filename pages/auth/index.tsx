import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import React, { useState } from "react";

const AuthPage = () => {
	const [isLoginForm, setIsLoginForm] = useState(false);

	const changeFormHandler = () => {
		setIsLoginForm((prev) => {
			return !prev;
		});
	};
	return isLoginForm ? (
		<LoginForm onClick={changeFormHandler} />
	) : (
		<SignupForm onClick={changeFormHandler} />
	);
};

export default AuthPage;
