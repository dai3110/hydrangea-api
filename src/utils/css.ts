export const csscat = (...classNames: (string | undefined | null)[]) => {
  return classNames.filter((c) => !!c).join(' ')
}
