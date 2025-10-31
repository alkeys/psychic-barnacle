"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	CheckCircle2,
	Server,
	Cpu,
	Headphones,
	Clock,
	Shield,
	ArrowLeft,
} from "lucide-react";

const Info: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative bg-pink-900 text-white py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<Button
						variant="ghost"
						onClick={() => navigate("/")}
						className="mb-6 text-pink-100 hover:text-white hover:bg-pink-800"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Volver al Inicio
					</Button>

					<div className="mb-6">
						<Badge
							variant="secondary"
							className="bg-pink-800 text-pink-100 border-pink-700"
						>
							Servicios Tecnológicos Integrales
						</Badge>
					</div>
					<h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
						InnovaTech
					</h1>
					<p className="text-xl md:text-2xl text-pink-100 max-w-3xl text-pretty leading-relaxed">
						Soluciones innovadoras en hardware y software que optimizan procesos
						empresariales y garantizan un funcionamiento eficiente de los
						sistemas informáticos.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				{/* About Section */}
				<div className="mb-20">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
						Sobre Nosotros
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<Card className="border-border">
							<CardContent className="p-8">
								<div className="flex items-start gap-4 mb-4">
									<div className="p-3 bg-pink-900 rounded-lg">
										<Server className="w-6 h-6 text-white" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-2">Hardware</h3>
										<p className="text-muted-foreground leading-relaxed">
											Especialistas en infraestructura tecnológica,
											mantenimiento preventivo y correctivo de equipos, y
											optimización de recursos físicos.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-8">
								<div className="flex items-start gap-4 mb-4">
									<div className="p-3 bg-pink-900 rounded-lg">
										<Cpu className="w-6 h-6 text-white" />
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-2">Software</h3>
										<p className="text-muted-foreground leading-relaxed">
											Desarrollo de soluciones personalizadas, integración de
											sistemas y soporte técnico especializado para aplicaciones
											empresariales.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* System Section */}
				<div className="mb-20">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
						Sistema de Gestión de Tickets
					</h2>
					<Card className="border-border bg-pink-50 dark:bg-pink-900">
						<CardContent className="p-8">
							<p className="text-lg text-foreground leading-relaxed mb-6">
								Nuestra plataforma permite llevar un control eficiente de los{" "}
								<strong>tickets de soporte técnico</strong>, facilitando el
								registro, gestión y seguimiento de incidencias o solicitudes de
								clientes. Esto mejora la organización interna y eleva la calidad
								del servicio.
							</p>
							<div className="flex items-center gap-3 text-muted-foreground">
								<Headphones className="w-5 h-5" />
								<span className="text-sm">
									Soporte técnico profesional y ético
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Features Section */}
				<div>
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
						Características Principales
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">
											Registro y Seguimiento
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Control completo de tickets de soporte técnico con
											trazabilidad en tiempo real.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">
											Clasificación Inteligente
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Organización por tipo de incidencia y nivel de prioridad
											para atención eficiente.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">Gestión de Recursos</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Administración de clientes y asignación óptima de técnicos
											especializados.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<Clock className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">Historial Completo</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Registro detallado de soluciones aplicadas para cada caso
											y cliente.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<Shield className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">
											Seguridad y Privacidad
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Protección de datos conforme a estándares éticos y
											normativas vigentes.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border">
							<CardContent className="p-6">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-pink-900 dark:text-pink-200 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-2">Interfaz Adaptable</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											Diseño intuitivo y personalizable según las necesidades de
											su empresa.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-pink-900 text-pink-200 py-12 px-6 mt-20">
				<div className="max-w-6xl mx-auto text-center">
					<p className="text-sm">
						© {new Date().getFullYear()} InnovaTech. Comprometidos con la
						excelencia tecnológica y la ética profesional.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Info;

