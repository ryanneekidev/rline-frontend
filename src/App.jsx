import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Private from './pages/Private/Private';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Create from './pages/Create/Create';
import PrivateRoute from './utilities/PrivateRoute';
import PublicRoute from './utilities/PublicRoute';

//Utilities
import AuthProvider from './utilities/AuthProvider';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route element={<PrivateRoute />}>
							<Route path='/private' element={<Private />} />
						</Route>
						<Route element={<PrivateRoute />}>
							<Route path='/create' element={<Create />} />
						</Route>
						<Route element={<PublicRoute />}>
							<Route path='/login' element={<Login />} />
						</Route>
						<Route element={<PublicRoute />}>
							<Route path='/register' element={<Register />} />
						</Route>
					</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App;
