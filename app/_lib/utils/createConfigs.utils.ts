/**
 * A utility function to create config object motivated by class-variance-authority.
 *
 * Usage:
 * This function is designed to provide a structured way to define object properties or
 * options, particularly suitable for server components. It allows for the definition of
 * variables and corresponding defaults.
 *
 * Note:
 * Nesting within the options is currently not supported. This design decision keeps the
 * configuration schema simple and avoids unnecessary complexity, especially considering
 * that the object configs used as prop values can already be intricate.
 *
 * */

type options<T> = {
  [K in keyof T]: {
    [P in keyof T[K]]: T[K][P];
  };
};

export const createConfigs = <T extends options<T>>(config: {
  options: T;
  defaultOptions: { [K in keyof T]: keyof T[K] };
}) => {
  return (props?: Partial<{ [K in keyof T]: keyof T[K] }>): { [K in keyof T]: T[K][keyof T[K]] } => {
    const result: { [K in keyof T]?: T[K][keyof T[K]] } = {};

    Object.keys(config.options).forEach((key) => {
      const k = key as keyof T;
      const variant = props?.[k] || config.defaultOptions[k];
      result[k] = config.options[k][variant];
    });

    return result as { [K in keyof T]: T[K][keyof T[K]] };
  };
};

/**
 * Typescript
 *
 * Objects defined with `createConfigs` aromatically defines the types. 
 * So it can be used with Wrapper like CreateConfigsProps
 * Make sure to use the `typeof`.
 * example:
 * const configSignInButton = createConfigs({...})
 * type PropsSignInButton = CreateConfigsProps<typeof configSignInButton>
 *
 * output: it will return all the types defined within the options.
 * */
export type CreateConfigsProps<T extends (...args: never[]) => unknown> = ReturnType<T>;
