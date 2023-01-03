import { atomQueryTags } from '@atomQueries/index';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const TagList = () => {
  const tagList = useRecoilValue(atomQueryTags);

  return (
    <Fragment>
      <ul>
        {tagList.map((tag) => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul>
    </Fragment>
  );
};
