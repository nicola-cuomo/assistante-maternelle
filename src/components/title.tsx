import { Inter } from 'next/font/google'
import { getDictionary } from "@/app/[lang]/dictionaries";

const inter = Inter({ subsets: ['latin'] })

export default async function Title() {
    const dict = await getDictionary('fr');
    return (<div className="relative flex place-items-center">
        <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            {dict.title}
        </h2>
    </div>)
}