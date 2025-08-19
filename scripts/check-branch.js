const { execSync } = require("child_process");

try {
  const isCi = process.env.CI === "true" || !!process.env.GITHUB_ACTIONS;
  const githubRef = process.env.GITHUB_REF || "";
  const isTagRef = githubRef.startsWith("refs/tags/");

  // Allow running on CI when the workflow is triggered by a tag push
  if (isCi && isTagRef) {
    process.exit(0);
  }

  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();

  if (currentBranch !== "main" && currentBranch !== "master") {
    console.error("⛔️ You can only release from main or master branch.");
    console.error("Current branch:", currentBranch);
    process.exit(1);
  }
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
