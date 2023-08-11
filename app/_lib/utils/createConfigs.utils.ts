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

type Options<T> = {
  [K in keyof T]: {
    [P in keyof T[K]]: T[K][P];
  };
};

type RequiredProps<T, R> = R extends (keyof T)[] ? { [K in R[number] & keyof T]: keyof T[K] } : {};

export const createConfigs = <T extends Options<T>, R extends (keyof T)[] | undefined = undefined>(config: {
  options: T;
  defaultOptions: Partial<{ [K in keyof T]: keyof T[K] | null | undefined }>;
  required?: R;
}) => {
  type PropsType = Partial<{ [K in keyof T]: keyof T[K] | null | undefined }> & RequiredProps<T, R>;

  const main = (
    ...[props]: R extends undefined ? [PropsType?] : [PropsType]
  ): { [K in keyof T]: T[K][keyof T[K]] } => {
    const result: { [K in keyof T]?: T[K][keyof T[K]] } = {};
    props = props ?? {};

    Object.keys(config.options).forEach((key) => {
      const k = key as keyof T;
      const variant = props?.[k] ?? config.defaultOptions[k];
      if (variant != null) {
        result[k] = config.options[k][variant];
      }
    });

    return result as { [K in keyof T]: T[K][keyof T[K]] };
  };
  return Object.assign(main, config.options);
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
