import { Session } from 'next-auth';

type Props = { userImage?: boolean | null };

export const mockedUserSession = ({ userImage }: Props): Session => {
  return {
    expires: new Date(Date.now() + 86400).toISOString(),
    user: {
      _id: '123',
      email: 'admin@example.com',
      name: 'mockedUser',
      image: !!userImage ? 'https://example.com/mockImage.jpg' : null,
    },
  };
};
