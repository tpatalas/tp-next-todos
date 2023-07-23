export const classNames = (...classes: unknown[]) => classes.filter(Boolean).join(' ') || undefined;
