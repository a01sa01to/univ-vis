class HslaColor {
  constructor(
    public h: number,
    public s: number,
    public l: number,
    public a: number,
  ) {}

  toString(): string {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
  }
}

export const getColor = (value: number): HslaColor => {
  const MAX = 100;
  const MIN = -50;
  // const h = Math.floor(
  //   ((value - MIN) / (MAX - MIN)) * (hottestColor.h - coolestColor.h) +
  //   coolestColor.h,
  // );
  // const s = Math.floor(
  //   ((value - MIN) / (MAX - MIN)) * (hottestColor.s - coolestColor.s) +
  //   coolestColor.s,
  // );
  // const l = Math.floor(
  //   ((value - MIN) / (MAX - MIN)) * (hottestColor.l - coolestColor.l) +
  //   coolestColor.l,
  // );
  const h = value >= 0 ? 20 : 200;
  const s = ((value - MIN) / (MAX - MIN)) * 75 + 25;
  const l = 50;
  // const l = (value - MIN) / (MAX - MIN) * 100;
  const a = value >= 40 ? 1 : Math.abs(value / 40);
  return new HslaColor(h, s, l, a);
};
