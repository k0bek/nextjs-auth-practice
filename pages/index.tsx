import LoginForm from "@/components/LoginForm";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	const username = session?.user?.email?.split("@")[0];

	const signOuthandler = () => {
		signOut();
	};

	return (
		<main>
			<h1 className=" text-6xl">Hello {username}!</h1>
			<button onClick={signOuthandler} className="bg-black text-white p-2">
				Sign out!
			</button>
		</main>
	);
}

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				pernament: false,
			},
		};
	}

	return {
		props: { session },
	};
}
