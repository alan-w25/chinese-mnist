import '../styles/globals.css'
import '../styles/tailwind.css'



export default function RootLayout({children}:{children:React.ReactNode}) {

  return (
    

    <html className="scroll-smooth" lang="en">
      <head>
        <title>Handwritten Chinese MNIST Learning</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

      </head>
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
