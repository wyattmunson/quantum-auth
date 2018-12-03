const Reset = "\x1b[0m";
const Underscore = "\x1b[4m";

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgLightRed = "\x1b[91m";
const FgLightGreen = "\x1b[92m";

const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgLightRed = "\x1b[91m";
const BgLightGreen = "\x1b[92m";

export const redText = input => {
  return FgRed + input + Reset;
};

export const greenText = input => {
  return FgGreen + input + Reset;
};

export const underline = input => {
  return Underscore + input + Reset;
};

export const cyanText = input => {
  return FgCyan + input + Reset;
};
