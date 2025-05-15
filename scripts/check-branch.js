const { execSync } = require("child_process");

try {
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
