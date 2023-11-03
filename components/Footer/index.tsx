import Link from 'next/link'
import { BsDiscord, BsGithub, BsTwitter } from 'react-icons/bs'
import { FaMediumM } from 'react-icons/fa'
import IconContainer from '../IconLinkContainer'

function Footer() {
  return (
    <section className='flex flex-col gap-2 my-4 mx-2 justify-between'>
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
        </div>
        <div className='flex flex-row gap-1 items-center justify-end'>
          <p>Audited by</p>
          <div className='flex gap-1 items-center flex-row'>
            <Link href='https://www.zokyo.io/' target='_blank'>
              <p>Zokyo</p>
            </Link>
            <p>&</p>
            <Link href='https://peckshield.com/' target='_blank'>
              <p>Peckshield</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
