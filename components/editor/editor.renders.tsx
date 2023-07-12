import { TypesTodos } from '@components/todos/todos.types';
import { TypesEditor } from '@editor/editor.types';
import { classNames } from '@stateLogics/utils';
import { Types } from 'lib/types';
import { RenderElementProps, RenderPlaceholderProps } from 'slate-react';

const PlaceHolderElement = ({
  attributes,
  ...props
}: RenderPlaceholderProps & Partial<Pick<Types, 'className'>>) => {
  return (
    <div
      {...attributes}
      className={`overflow-hidden text-ellipsis font-roboto font-normal text-gray-900 ${props.className}`}
    >
      <span>{props.children}</span>
    </div>
  );
};

const CodeElement = ({ attributes, ...props }: RenderElementProps & Partial<Pick<Types, 'className'>>) => {
  return (
    <pre
      {...attributes}
      className={classNames(props.className)}
    >
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = ({ attributes, ...props }: RenderElementProps & Partial<Pick<Types, 'className'>>) => {
  return (
    <div
      {...attributes}
      className={classNames(props.className ?? 'text-slate-700')}
    >
      {props.children}
    </div>
  );
};

/**
 * Slate Editor Renderer
 */
export const renderPlaceholder = ({
  ...props
}: RenderPlaceholderProps & Partial<Pick<TypesEditor, 'titleName'>>) => {
  return (
    <PlaceHolderElement
      {...props}
      className={props.titleName === 'title' ? 'text-2xl' : 'text-base'}
    >
      {props.children}
    </PlaceHolderElement>
  );
};

export const renderCustomElement = ({
  ...props
}: RenderElementProps & Partial<Pick<TypesEditor, 'titleName'> & Pick<TypesTodos, 'completed'>>) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return (
        <DefaultElement
          {...props}
          className={`
          ${props.titleName === 'title' ? 'text-2xl' : 'text-base'}
          ${props.completed ? 'text-opacity-60' : 'text-slate-700'}`}
        />
      );
  }
};
