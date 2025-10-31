"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6]">
			{/* Hero Section */}
			<section className="relative py-32 px-6">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
					<div className="absolute top-40 right-10 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
					<div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
				</div>

				<div className="max-w-6xl mx-auto text-center relative z-10">
					<Badge
						variant="secondary"
						className="bg-white/80 text-pink-900 border-pink-200 mb-6"
					>
						Sistema de Gestión Profesional
					</Badge>
					<h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-pink-950">
						Bienvenido a InnovaTech
					</h1>
					<p className="text-xl md:text-2xl text-pink-900 max-w-3xl mx-auto mb-12 text-pretty leading-relaxed">
						Gestiona tus servicios de soporte técnico de manera eficiente,
						profesional y ética
					</p>
					<Button
						size="lg"
						className="bg-pink-950 text-white hover:bg-pink-900 text-lg px-8 py-6 h-auto group shadow-lg"
						onClick={() => navigate("/login")}
					>
						Iniciar Sesión
						<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-950">
						¿Por qué elegir InnovaTech?
					</h2>
					<p className="text-lg text-pink-900 max-w-2xl mx-auto text-pretty">
						Nuestra plataforma ofrece las herramientas necesarias para una
						gestión integral de servicios técnicos
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<Card className="border-pink-200 bg-white/80 backdrop-blur-sm">
						<CardContent className="p-8 text-center">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl mb-6">
								<Shield className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3 text-pink-950">
								Seguro y Ético
							</h3>
							<p className="text-pink-800 leading-relaxed">
								Protección de datos y cumplimiento de estándares éticos en cada
								operación
							</p>
						</CardContent>
					</Card>

					<Card className="border-pink-200 bg-white/80 backdrop-blur-sm">
						<CardContent className="p-8 text-center">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl mb-6">
								<Zap className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3 text-pink-950">
								Rápido y Eficiente
							</h3>
							<p className="text-pink-800 leading-relaxed">
								Gestión ágil de tickets con seguimiento en tiempo real y
								respuestas inmediatas
							</p>
						</CardContent>
					</Card>

					<Card className="border-pink-200 bg-white/80 backdrop-blur-sm">
						<CardContent className="p-8 text-center">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-xl mb-6">
								<Users className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3 text-pink-950">
								Centrado en el Cliente
							</h3>
							<p className="text-pink-800 leading-relaxed">
								Interfaz intuitiva diseñada para mejorar la experiencia de
								usuarios y técnicos
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* CTA Section */}
			<section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
				<Card className="border-pink-200 bg-white/90 backdrop-blur-sm shadow-xl">
					<CardContent className="p-12 text-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-950">
							Comienza a gestionar tus servicios hoy
						</h2>
						<p className="text-lg text-pink-900 mb-8 text-pretty">
							Accede a tu cuenta y descubre todas las funcionalidades de nuestra
							plataforma profesional
						</p>
						<Button
							size="lg"
							className="bg-pink-950 text-white hover:bg-pink-900 text-lg px-8 py-6 h-auto group shadow-lg"
							onClick={() => navigate("/info")}
						>
							Acceder al Sistema
							<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</CardContent>
				</Card>
			</section>

			{/* Footer */}
			<footer className="bg-pink-950 text-pink-200 py-12 px-6 mt-20">
				<div className="max-w-6xl mx-auto text-center">
					<p className="text-sm">
						© {new Date().getFullYear()} InnovaTech. Comprometidos con la
						excelencia tecnológica y la ética profesional.
					</p>
				</div>
			</footer>
		</div>
	);
}
