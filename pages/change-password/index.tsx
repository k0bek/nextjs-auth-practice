import React, { useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const ChangePasswordPage = () => {
	const previousPasswordRef = useRef();
	const currentPasswordRef = useRef();
	const router = useRouter();

	const { data: session, status } = useSession();

	console.log(session);

	const changePasswordHandler = async () => {
		const enteredPreviousPassword = previousPasswordRef.current.value;
		const enteredCurrentPassword = currentPasswordRef.current.value;

		await fetch("/api/user/change-password", {
			method: "PATCH",
			body: JSON.stringify({
				oldPassword: enteredPreviousPassword,
				newPassword: enteredCurrentPassword,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
	return (
		<main className="flex flex-col gap-2">
			<label className="text-white">Previous password</label>
			<input type="password" ref={previousPasswordRef} />
			<label className="text-white">Current Password</label>
			<input type="password" ref={currentPasswordRef} />
			<button onClick={changePasswordHandler} className=" bg-white p-2">
				Change password
			</button>
			<button
				onClick={() => {
					router.push("/");
				}}
				className="bg-white p-2"
			>
				Main page
			</button>
		</main>
	);
};

export default ChangePasswordPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
