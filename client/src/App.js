import Home from './pages/Home';
import GlobalStyle from './styles/GlobalStyle';
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			<Route path={['/daily/:id', '/hourly/:id', '/']}>
				<Home />
			</Route>
		</div>
	);
}

export default App;
