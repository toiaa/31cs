import Button from '@/components/Button'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  return (
    <main
      className={
        'flex flex-col gap-[40px] mt-4 items-center container-custom border-2 border-box-dark-neutral rounded-lg justify-center p-4'
      }>
      <p className='text-[90px] font-bold'>404</p>
      <h1 className='font-bold text-lg'>This page is not found</h1>
      <Button onClick={() => router.push('/')}>Back To Home</Button>
    </main>
  )
}
