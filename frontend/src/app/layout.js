import { Inter } from 'next/font/google';
import { AuthProvider } from '@/Context/AuthContext';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Quick Kerala - Explore God\'s Own Country',
  description: 'Discover the beauty of Kerala with our curated travel experiences',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white">
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}