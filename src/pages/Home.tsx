import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const login = () => {
		navigate("/login");
	};
	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			<button
				type="button"
				onClick={login}
				className="
                  group relative overflow-hidden rounded-xl
                  bg-gradient-to-r from-[#be185d] to-[#a21caf]
                  px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#be185d]/30
                  transition-all duration-300 ease-out
                  hover:shadow-xl hover:shadow-[#be185d]/40 hover:scale-105
                  active:scale-95
                "
			>
				<span className="relative z-10 flex items-center gap-2">
					<span>Iniciar Sesión</span>
					<span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
						→
					</span>
				</span>
				<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
			</button>
			<h1>Bienvenido a la Aplicación</h1>
		</div>
	);
};

export default Home;
