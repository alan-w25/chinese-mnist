import '../styles/globals.css'
import '../styles/tailwind.css'



export default function RootLayout({children}:{children:React.ReactNode}) {

  return (
    <html className="scroll-smooth" lang="en">
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
