import { TypesFooterSocial } from '@collections/footer';

export const optionsSocialPaths = (social: TypesFooterSocial) => ({
  path: social.path,
  className: 'w-6 h-6 fill-gray-400 group-hover:fill-gray-700',
  testId: social.testId,
});
