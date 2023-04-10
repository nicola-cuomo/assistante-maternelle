import './globals.css'
import { getDictionary } from './[lang]/dictionaries'
import Title from '@/components/title'


export async function generateMetadata() {
  const dict = await getDictionary('fr')
  return {
    title: dict.title,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body className='bg-gray-100'>
        <main id="root" className="flex flex-col items-center p-12">
          {/* @ts-expect-error Async Server Component */}
          <Title />
          {children}
        </main>
      </body>
    </html>
  )
}
