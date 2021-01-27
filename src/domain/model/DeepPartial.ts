/* eslint-disable @typescript-eslint/no-unused-vars */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
