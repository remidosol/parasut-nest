import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-angular"],
  parserPreset: "conventional-changelog-angular",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "client",
        "config",
        "core",
        "deps",
        "release",
        "server",
        "test",
        "types",
        "utils",
        "dto",
        "lib",
        "docs",
      ],
    ],
    "scope-case": [
      RuleConfigSeverity.Error,
      "always",
      ["lower-case", "snake-case"],
    ],
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
    "header-max-length": [RuleConfigSeverity.Error, "always", 120],
    "body-max-length": [RuleConfigSeverity.Error, "always", 1000],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 1000],
    "footer-max-length": [RuleConfigSeverity.Error, "always", 100],
  },
};

export default Configuration;
