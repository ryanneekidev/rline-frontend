import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Public from './pages/Public/Public';
import Private from './pages/Private/Private';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

//Utilities
import AuthProvider from './utilities/AuthProvider';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/public' element={<Public />} />
					<Route path='/private' element={<Private />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
