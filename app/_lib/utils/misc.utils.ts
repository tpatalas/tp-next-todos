export const mergeClasses = (...classes: unknown[]) => classes.filter(Boolean).join(' ') || undefined;
