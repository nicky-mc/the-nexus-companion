import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import { CompendiumProvider } from '@/app/context/CompendiumContext'; // Import CompendiumProvider

export default function RootLayout({ children }) {
  return (
    <CompendiumProvider>
      <html lang="en" data-theme="light">
        <body>
          <Navbar />
          {children}
          <ToastContainer />
        </body>
      </html>
    </CompendiumProvider>
  );
}
