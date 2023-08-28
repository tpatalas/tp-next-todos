import { authOptions } from '@/api/auth/[...nextauth]/authOptions';
import { SvgIcon } from '@/icon/svgIcon';
import { configsSvgIconLogo } from '@/icon/svgIcon/svgIcon.configs';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export const Logo = async () => {
  const session = await getServerSession(authOptions);
  const route = !!session ? '' : '/';
  const routeClassName = !!session ? 'cursor-pointer' : 'pointer-events-none';

  return (
    <nav className='flex h-0 flex-row items-center'>
      <Link
        href={route}
        className={routeClassName}
        aria-label='Logo to route to index page.'
      >
        <span className='flex w-full flex-row items-center justify-center'>
          <SvgIcon configs={configsSvgIconLogo({ preset: 'logoFull' })} />
        </span>
      </Link>
    </nav>
  );
};
