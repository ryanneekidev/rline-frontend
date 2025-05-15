import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Public from './pages/Public/Public';
import Private from './pages/Private/Private';

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
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
