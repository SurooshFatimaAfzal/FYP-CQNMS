import Sidebar from './components/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-[#f8fafc] h-screen overflow-hidden">
        <Sidebar /> 
        <main className="flex-1 overflow-y-auto relative">{children}</main>
      </body>
    </html>
  );
}