type ObjectOnlyMessage = 'Only non-array object types are permitted as values within the initial object.';
type DisallowArray<T, K extends keyof T, S> = T[K] extends Array<unknown>
  ? ObjectOnlyMessage
  : { [P in keyof T[K]]: S | T[K][P] | [] | Array<string> | Array<number> };
type TypesOptions<T, S extends string> = {
  [K in keyof T]: T[K] extends object ? DisallowArray<T, K, S> : ObjectOnlyMessage;
};
type Options<T, U> = { [K in keyof Merge<T, U>]: keyof Merge<T, U>[K] | null | undefined };
type Merge<T, U> = T & U;
type Configs<T, U, P extends string> = {
  options: T;
  defaultOptions: Partial<Options<T, U>>;
  presetOptions?: Partial<Record<P, Partial<Options<T, U>>>>;
  extendOptions?: { options: U }[];
};

export const createConfigs = <
  T extends TypesOptions<T, S>,
  U extends TypesOptions<U, S>,
  S extends string,
  P extends string = never,
>(
  config: Configs<T, U, P>,
): ((props?: Partial<{ [K in keyof Merge<T, U>]: keyof Merge<T, U>[K] } & { preset?: P }>) => {
  [K in keyof Merge<T, U>]: Merge<T, U>[K][keyof Merge<T, U>[K]];
}) & { options: T } => {
  const extendOptions: { [key: string]: unknown } = {};

  if (config.extendOptions) {
    for (const extendOption of config.extendOptions) {
      if (extendOption && 'options' in extendOption) {
        for (const key in extendOption.options) {
          extendOptions[key] = extendOption.options[key];
        }
      }
    }
  }

  const options = {} as typeof config.options;

  const configOptions = config.options;
  for (const key in configOptions) {
    options[key as keyof typeof configOptions] = configOptions[key];
  }
  for (const key in extendOptions) {
    options[key as keyof typeof config.options] = extendOptions[key] as T[keyof T];
  }

  const callable = (
    props?: Partial<{ [K in keyof Merge<T, U>]: keyof Merge<T, U>[K] } & { preset?: P }>,
  ): { [K in keyof Merge<T, U>]: Merge<T, U>[K][keyof Merge<T, U>[K]] } => {
    const defaultOptions = config.defaultOptions;
    const presetOptions = config.presetOptions;
    const result: { [K in keyof T]?: T[K][keyof T[K]] | null } = {};
    const presetProp = props?.preset;
    const preset = presetProp ? presetOptions?.[presetProp] : undefined;

    for (const key in options) {
      const k = key as keyof T;
      const getVariant = (k: keyof T) => {
        if (props && k in props) return props[k];
        if (preset && k in preset) return preset[k] !== undefined ? preset[k] : defaultOptions[k];
        return defaultOptions[k];
      };
      const variant = getVariant(k);

      if (!!variant && variant in (options[k] as object)) {
        result[k] = options[k][variant as keyof T[keyof T]];
      }
      if (variant === null) {
        result[k] = null;
      }
    }

    return result as { [K in keyof Merge<T, U>]: Merge<T, U>[K][keyof Merge<T, U>[K]] };
  };

  callable.options = options;

  return callable;
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
