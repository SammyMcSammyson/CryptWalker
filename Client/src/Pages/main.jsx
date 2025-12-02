import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../CSS/index.css';
import App from '../Pages/App.jsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element 'root' not found in the DOM.");
}
