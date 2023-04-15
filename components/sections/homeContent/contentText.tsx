type content = 'header' | 'subHeader' | 'body';
type Props = { options?: Record<content, string> };

export const ContentText = ({ options }: Props) => {
  const { header, subHeader, body } = options ?? {};

  return (
    <div className='flex max-w-md flex-col items-center justify-center space-y-3 text-center font-bold md:items-start md:text-start md:leading-relaxed md:tracking-wide'>
      <p className='text-2xl text-slate-800 md:text-3xl'>{header}</p>
      <p className='text-lg text-slate-800/80 md:text-xl'>{subHeader}</p>
      <p className='text-base font-medium text-slate-800/60'>{body}</p>
    </div>
  );
};
