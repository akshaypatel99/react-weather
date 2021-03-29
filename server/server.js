import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/error.js';

import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Gives us access request body
app.use(express.json());
// Log incoming requests in dev mode
app.use(morgan('dev'));

app.use('/api/weather', weatherRoutes);

if (process.env.NODE_ENV === 'production') {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res, next) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res, next) => {
		res.send('API is running...');
	});
}

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});
