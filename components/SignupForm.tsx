import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

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
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: FormData) => console.log(data);

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

			<input
				type="submit"
				className=" cursor-pointer bg-sky-600 text-white font-medium rounded-md py-2"
			/>

			<p className=" self-center">
				Have an account?{" "}
				<span
					className="text-sky-600 font-medium cursor-pointer"
					onClick={onClick}
				>
					Log in!
				</span>
			</p>
		</form>
	);
}
