import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routers/router';
import CartProvider from './providers/CartProvider';
import AuthProvider from './providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

// ✅ FIX HERE
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>

            <div className='max-w-screen-xl mx-auto'>
              <RouterProvider router={router} />
            </div>

          </QueryClientProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);