import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/admin/AdminPanel";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminPanel />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
