const _MESSAGE_PREFIX = "Kirlia";

const consoleConfig = {
  colours: {
    yellow: 33,
    red: 31,
    magenta: 35,
    cyan: 36,
    white: 37,
    brightWhite: 97,
  },
  modifiers: {
    normal: 0,
    bold: 1,
    faint: 2,
    italic: 3,
    underline: 4,
    framed: 51,
    encircled: 52,
  },
};

const logger = {
  info: (message: string, additionalInfo?: any) => {
    console.info(
      `[${_MESSAGE_PREFIX}] \x1B[${consoleConfig.colours.cyan};${
        consoleConfig.modifiers.faint
      }mINFO:\x1b[0m ${message} ${additionalInfo ?? ""}`
    );
  },
  warn: (message: string, additionalInfo?: any) => {
    console.warn(
      `[${_MESSAGE_PREFIX}] \x1B[${
        consoleConfig.colours.yellow
      }mWARN:\x1b[0m ${message} ${additionalInfo ?? ""}`
    );
  },
  error: (message: string, additionalInfo?: any) => {
    console.error(
      `[${_MESSAGE_PREFIX}] \x1B[${consoleConfig.colours.red};${
        consoleConfig.modifiers.bold
      };${consoleConfig.modifiers.underline}mERROR:\x1b[0m ${message} ${
        additionalInfo ?? ""
      }`
    );
  },
};

export { logger };
