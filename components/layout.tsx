import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className=" bg-sky-600">
			<main className="flex flex-col items-center min-h-screen justify-center">
				{children}
			</main>
		</div>
	);
};

export default Layout;
