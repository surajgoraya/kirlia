interface CORSPolicyOpt {
  config: string | undefined;
}

const processEnvironmentConfig = ({ config }: CORSPolicyOpt) => {
  switch (config) {
    case "same-origin":
      return "same-origin";
    case "same-site":
      return "same-site";
    case "cross-origin":
      return "cross-origin";
    default:
      console.warn(
        "[Kirlia Warn]: Invalid or no CORS policy listed in .env file. Defaulting to same-site."
      );
      return "same-site";
  }
};

export { processEnvironmentConfig };
