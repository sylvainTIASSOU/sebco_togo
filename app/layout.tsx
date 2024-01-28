import type { Metadata } from 'next'
import './globals.css';
import {Footer, Header} from "../components";
import {ReduxProvider} from "@/redux/provider";



export const metadata: Metadata = {
  title: 'SeBcO TOGO',
  
  description: 'sebco est une application web de vente des sable de gravier, remblai et des matériaux de construction',
   
  icons: {
    icon: '/SEBCOTOGO.png',
    
  },
}

export default function RootLayout({ children,}: { children: React.ReactNode}) {

  return (
    <html lang="fr">

      <body className={""}>
      <ReduxProvider>
        <Header/>
        {children}
        <Footer/>
      </ReduxProvider>

        </body>

    </html>
  )
}
