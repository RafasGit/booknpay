import Image from 'next/image'

const Logo = () => {
  return <Image className='object-centre' src="/logo.svg" alt="logo" width={63} height={60} />
}

export default Logo