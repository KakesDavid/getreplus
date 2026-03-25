import { FirebaseClientProvider } from '@/firebase';
import './globals.css';

export const metadata = {
  title: 'GetrePlus — Earn Real Money Every Friday',
  description: 'Nigeria\'s most trusted referral earning platform. Join 12,400+ Nigerians earning via direct bank transfer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-gold/30">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
