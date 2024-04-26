import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/RegisterPage";
import Students from "./pages/Students";
import StudentsDetails from "./pages/StudentsDetails";
import { Navigate } from "react-router-dom";

function App() {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	return (
		<>
			<Navbar isAuthenticated={isAuthenticated} />
			<div style={{ height: "calc(100vh - 100px)" }}>
				<Routes>
					<Route
						path='/'
						element={
							isAuthenticated ? (
								<Navigate to='/students' />
							) : (
								<LoginPage />
							)
						}
					/>
					<Route
						path='/register'
						element={
							isAuthenticated ? (
								<Navigate to='/students' />
							) : (
								<RegisterPage />
							)
						}
					/>
					<Route
						path='/students'
						element={
							isAuthenticated ? <Students /> : <Navigate to='/' />
						}
					/>
					<Route
						path='/student-details/:NID'
						element={
							isAuthenticated ? (
								<StudentsDetails />
							) : (
								<Navigate to='/' />
							)
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
