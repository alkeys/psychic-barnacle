
import React from "react";

const Info: React.FC = () => {
	return (
		<div>
			<h1>Información de la Empresa</h1>

			<p>
				<strong>Nombre de la Empresa:</strong> InnovaTech
			</p>

			<p>
				<strong>Descripción:</strong> InnovaTech es una empresa dedicada a ofrecer
				servicios tecnológicos integrales, especializados en el área de{" "}
				<strong>hardware</strong> y <strong>software</strong>. Su objetivo principal
				es brindar soluciones innovadoras que optimicen los procesos empresariales
				y garanticen un funcionamiento eficiente de los sistemas informáticos de sus clientes.
			</p>

			<h2>Sobre el Sistema</h2>
			<p>
				El sistema permitirá a InnovaTech llevar un control eficiente de los{" "}
				<strong>tickets de soporte técnico</strong>. A través de esta plataforma, la
				empresa podrá registrar, gestionar y dar seguimiento a las incidencias o solicitudes
				de los clientes, mejorando así la organización interna y la calidad del servicio.
			</p>

			<h2>Características Principales</h2>
			<ul>
				<li>Registro y seguimiento de tickets de soporte técnico.</li>
				<li>Clasificación de incidencias por tipo y prioridad.</li>
				<li>Gestión de clientes y técnicos asignados.</li>
				<li>Historial de soluciones aplicadas a cada caso.</li>
				<li>Interfaz sencilla y adaptable a las necesidades de la empresa.</li>
			</ul>

			<p>
				Archivo: <code>src/pages/Info.tsx</code>
			</p>
		</div>
	);
};

export default Info;
