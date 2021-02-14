export type CaseRegisterInput = Readonly<{
  feederId: number;
  hour: number;
  minute: number;
  pvCount: number;
  pvScale: number;
  loadScale: number;
  baseV: number;
  seed: number;
}>;
