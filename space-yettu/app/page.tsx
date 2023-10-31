import Image from 'next/image'
import { Container } from 'postcss'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
      
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
          + List your space
        </button>
        </div>
        
    </main>
  )
}
