import './globals.css';

import Navbar from '@/components/Navbar';
import { CompendiumProvider } from '@/app/context/CompendiumContext'; // Import CompendiumProvider

export default function RootLayout({ children }) {
  return (
    <CompendiumProvider>
      <html lang="en" data-theme="light">
        <body>
          <Navbar />
          {children}
          
        </body>
      </html>
    </CompendiumProvider>
  );
}
