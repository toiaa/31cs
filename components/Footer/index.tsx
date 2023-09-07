import Image from 'next/image'
import Link from 'next/link'
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs'
import { FaMediumM } from 'react-icons/fa'
import IconContainer from '../IconLinkContainer'

function Footer() {
  return (
    <section className='flex flex-col gap-2 mt-10 mx-2 justify-between lg:mb-0 mb-20'>
      <div className='flex items-end lg:items-center justify-between w-full'>
        <div className='flex gap-4 flex-col'>
          <div className='flex justify-between w-40'>
            <IconContainer>
              <BsTwitter color='#fff' size={25} />
            </IconContainer>
            <IconContainer>
              <FaMediumM color='#fff' size={25} />
            </IconContainer>
            <IconContainer>
              <BsGithub color='#fff' size={25} />
            </IconContainer>
            <IconContainer>
              <BsDiscord color='#fff' size={25} />
            </IconContainer>
          </div>
          <p>© 2023 TOKENPROJECT</p>
        </div>
        <div className='flex lg:flex-row flex-col gap-2 items-center justify-end'>
          <p>Audited by</p>
          <div className='flex lg:gap-2 items-center lg:flex-row flex-col'>
            <Link href='https://www.zokyo.io/' target='_blank'>
              <Image src='/images/audit.png' width={110} height={15} alt='Logo' />
            </Link>
            &
            <Link href='https://peckshield.com/' target='_blank'>
              <Image src='/images/peckshield.svg' width={120} height={15} alt='Logo' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
