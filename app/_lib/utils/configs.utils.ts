type TypesOptions<T, S extends string> = {
  [K in keyof T]: { [P in keyof T[K]]: S | T[K][P] };
};
type TypesConfigs<T, P extends string> = {
  options: T;
  defaultOptions: Partial<{ [K in keyof T]: keyof T[K] | null | undefined }>;
  presetOptions?: Partial<Record<P, Partial<{ [K in keyof T]: keyof T[K] }>>>;
};

export const createConfigs = <T extends TypesOptions<T, S>, S extends string, P extends string = never>(
  config: TypesConfigs<T, P>,
): ((props?: Partial<{ [K in keyof T]: keyof T[K] } & { preset?: P }>) => {
  [K in keyof T]: T[K][keyof T[K]];
}) => {
  return (props?: Partial<{ [K in keyof T]: keyof T[K] } & { preset?: P }>): { [K in keyof T]: T[K][keyof T[K]] } => {
    const { defaultOptions, options, presetOptions } = config;

    const result: { [K in keyof T]?: T[K][keyof T[K]] } = {};
    const preset = props?.preset ? presetOptions?.[props.preset] : undefined;

    for (const key in options) {
      const k = key as keyof T;
      const defaultOptionsOutput = defaultOptions ? defaultOptions[k] : undefined;
      const presetOptionsOutput = preset ? preset[k] : undefined;
      const variant = props?.[k] ?? presetOptionsOutput ?? defaultOptionsOutput;

      if (!!variant && options[k].hasOwnProperty(variant)) {
        result[k] = options[k][variant as keyof T[keyof T]];
      }
    }

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

export type ConfigsProps<T extends (...args: never[]) => unknown> = ReturnType<T>;
