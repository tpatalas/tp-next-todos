import { TypesSvgLogo } from '@lib/types';
import { TypesOptionsSvg } from '@lib/types/typesOptions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next-router-mock';
import { Button } from '.';
import { DATA_SVG_LOGO } from '@collections/svgLogo';

type Props = { options?: TypesOptionsSvg };

export const SvgLogoButton = ({ options = {} }: Props) => {
  const router = useRouter();

  const oAuthSignIn = async (logo: TypesSvgLogo) => {
    const response = await signIn(logo.name.toLowerCase(), { redirect: false });
    if (response && !response.error) {
      router.replace('/');
      return;
    }
  };

  return (
    <>
      {DATA_SVG_LOGO.map((logo) => (
        <div
          key={logo.name}
          className='mb-3'>
          <Button
            options={{
              type: 'button',
              className: logo.className,
            }}
            onClick={() => oAuthSignIn(logo)}>
            <span className='pr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden={true}
                height={options.height ?? '24'}
                width={options.width ?? '24'}
                viewBox={logo.viewBox}>
                {logo.path}
              </svg>
            </span>
            <span>Continue with {logo.name}</span>
          </Button>
        </div>
      ))}
    </>
  );
};
