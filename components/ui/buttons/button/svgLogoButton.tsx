import { DATA_SVG_LOGO } from '@data/dataArrayOfObjects';
import { TypesOptionsSvg } from '@lib/types/typesOptions';
import { signIn } from 'next-auth/react';
import { Button } from '.';

type Props = { options?: TypesOptionsSvg };

export const SvgLogoButton = ({ options = {} }: Props) => {
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
            onClick={() => signIn(logo.name.toLowerCase())}>
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
