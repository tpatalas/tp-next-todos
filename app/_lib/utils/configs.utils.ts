/**
 * A utility function to create config object
 *
 * Usage:
 * This function is designed to provide a structured way to define object properties or
 * options, particularly suitable for server components. It allows for the definition of
 * variables and corresponding defaults.
 * */

type DisallowFurtherNesting<T> = T extends object ? 'Further nesting is not permitted' : T;
type ValueTypes<T> = { [K in keyof T]: T[K] extends object ? ValueTypes<T[K]> : T[K] };
type NestedOptions<T> = { [Property in keyof T]: DisallowFurtherNesting<ValueTypes<T[Property]>> };
type RootOptions<T> = { [Key in keyof T]: NestedOptions<T[Key]> };
type RequiredProps<T, R> = R extends (keyof T)[] ? { [K in R[number] & keyof T]: keyof T[K] } : {};
type CommonKeyType<T> = { [K in keyof T]: keyof T[K] | null | undefined };
type PresetOptions<T> = Partial<CommonKeyType<T>>;

export const createConfigs = <
  T extends RootOptions<T>,
  R extends (keyof T)[] | undefined = undefined,
  P extends { [name: string]: PresetOptions<T> } | undefined = undefined,
>(config: {
  options: T;
  defaultOptions: Partial<CommonKeyType<T>>;
  required?: R;
  presetOptions?: P & {
    [K in keyof P]: { [L in keyof P[K]]: L extends keyof T ? keyof T[L] : CommonKeyType<T> };
  };
}) => {
  type PropsType = Partial<CommonKeyType<T>> &
    RequiredProps<T, R> & { preset?: P extends undefined ? never : keyof P };

  const main = (
    ...[props]: R extends undefined ? [PropsType?] : [PropsType]
  ): { [K in keyof T]: T[K][keyof T[K]] } => {
    const result: { [K in keyof T]?: T[K][keyof T[K]] } = {};
    props = props ?? {};
    const { options, defaultOptions, presetOptions } = config;

    const mergedOptions = { ...defaultOptions };
    if (props.preset && presetOptions) {
      Object.assign(mergedOptions, presetOptions[props.preset]);
    }
    Object.assign(mergedOptions, props);

    for (const k in options) {
      const variant = mergedOptions[k] ?? defaultOptions[k];
      if (variant != null) {
        result[k] = options[k][variant];
      }
      if (mergedOptions[k] === null || mergedOptions[k] === undefined) {
        delete result[k];
      }
    }
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

export type ConfigsProps<T extends (...args: never[]) => unknown> = ReturnType<T>;
