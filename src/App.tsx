import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/admin/AdminPanel";
import TecnicoPanel from "./pages/tecnico/TecnicoPanel";
import ClientePanel from "./pages/cliente/ClientePanel";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminPanel />} />
				<Route path="/tecnico" element={<TecnicoPanel />} />
				<Route path="/cliente" element={<ClientePanel />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
