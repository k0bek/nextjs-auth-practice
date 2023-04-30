import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
	.object({
		email: yup
			.string()
			.email("Invalid email")
			.required("You have to add your email"),
		password: yup.string().required("You have to add your password"),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

interface LoginFormProps {
	onClick: () => void;
}

export default function LoginForm({ onClick }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		setSubmitted(true);
		const { email, password } = data;

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		setLoading(false);
		setSubmitted(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 bg-white p-20 rounded-2xl"
		>
			<h1 className=" self-center font-bold text-3xl mb-4">Log in</h1>
			<label className="font-medium">Email address</label>
			<input
				{...register("email")}
				className=" w-50 sm:w-96 border-2 border-l-indigo-100 rounded-md py-1"
			/>
			<p>{errors.email?.message}</p>

			<label className="font-medium">Password</label>
			<input
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
				{loading ? "Loading..." : "Log in"}
			</button>

			<p className=" self-center">
				Do not have an account?{" "}
				<span
					className="text-sky-600 font-medium cursor-pointer"
					onClick={onClick}
				>
					Sign up!
				</span>
			</p>
		</form>
	);
}
