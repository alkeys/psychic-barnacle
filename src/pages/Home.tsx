import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const login = () => {
		navigate("/login");
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] flex items-center justify-center p-4">
			{/* Elementos decorativos de fondo */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-[#be185d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
				<div className="absolute bottom-20 right-10 w-72 h-72 bg-[#a21caf] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
			</div>

			{/* Tarjeta principal */}
			<div className="relative w-full max-w-md">
				<div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 animate-[fadeIn_0.6s_ease-out]">
					{/* Logo/Header */}
					<div className="text-center mb-8 animate-[slideDown_0.6s_ease-out]">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#be185d] to-[#a21caf] mb-4 shadow-lg">
							<svg
								className="w-10 h-10 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Decorative server icon</title>
								<path
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Zm11-4v2m0 10v2m0-8v2"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
							Bienvenido a la Aplicación
						</h1>
						<p className="text-[#a21caf] mt-2">
							¡Gestiona tus servicios fácilmente!
						</p>
					</div>

					{/* Botón de inicio de sesión */}
					<button
						type="button"
						onClick={login}
						className="
							w-full py-3 px-6 bg-gradient-to-r from-[#be185d] to-[#a21caf]
							text-white font-semibold rounded-xl shadow-lg
							hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
							transition-all duration-300 animate-[slideUp_0.6s_ease-out_0.3s_both]
							group relative overflow-hidden
						"
					>
						<span className="relative z-10 flex items-center gap-2 justify-center">
							<span>Iniciar Sesión</span>
							<span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
								→
							</span>
						</span>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
