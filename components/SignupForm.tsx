import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

const schema = yup
	.object({
		name: yup.string().required("You have to add your name"),
		email: yup
			.string()
			.email("Invalid email")
			.required("You have to add your email"),
		password: yup.string().required("You have to add your password"),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

interface SignupFormProps {
	onClick: () => void;
}

export default function SignupForm({ onClick }: SignupFormProps) {
	const [invalidPassword, setInvalidPassword] = useState<boolean>(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const createUser = async (name: string, email: string, password: string) => {
		setLoading(true);
		setSubmitted(true);
		const response = await fetch("api/auth/sign-up", {
			method: "POST",
			body: JSON.stringify({ username: name, email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		setInvalidPassword(response.ok);

		await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		setSubmitted(false);

		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	const onSubmit = (data: FormData) => {
		const { name, email, password } = data;

		createUser(name, email, password);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 bg-white p-20 rounded-2xl"
		>
			<h1 className=" self-center font-bold text-3xl mb-4">Sign up</h1>
			<label className="font-medium" htmlFor="name">
				Name
			</label>
			<input
				{...register("name")}
				className=" w-50 sm:w-96 border-2 border-l-indigo-100 rounded-md py-1"
				id="name"
			/>
			<p>{errors.name?.message}</p>

			<label className="font-medium" htmlFor="email">
				Email address
			</label>
			<input
				id="email"
				{...register("email")}
				className=" w-50 sm:w-96 border-2 border-l-indigo-100 rounded-md py-1"
			/>
			{!invalidPassword && <p>Email is already in use.</p>}
			<p>{errors.email?.message}</p>

			<label className="font-medium" htmlFor="password">
				Password
			</label>
			<input
				id="password"
				{...register("password")}
				className=" w-50 sm:w-96 border-2 border-l-indigo-100 rounded-md py-1"
				type="password"
			/>
			<p>{errors.password?.message}</p>

			<button
				type="submit"
				className={`cursor-pointer font-medium rounded-md py-2 ${
					loading || submitted
						? "bg-gray-400 text-gray-600 cursor-not-allowed"
						: "bg-sky-600 text-white"
				}`}
				disabled={loading || submitted}
			>
				{loading ? "Loading..." : "Sign up"}
			</button>

			<p className=" self-center">
				Have an account?{" "}
				<button
					className={`
					${loading || submitted ? " text-gray-600 cursor-not-allowed" : " text-sky-600"}
					`}
					onClick={onClick}
					disabled={loading || submitted}
				>
					Log in!
				</button>
			</p>
		</form>
	);
}
