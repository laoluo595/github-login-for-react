import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import 'antd/dist/antd.min.css' // ant ui
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <App />
)