const env = require("@nomiclabs/buidler");
const fs = require("fs-extra");
const path = require("path");

// this compiles the contracts and copies them to the src directory, so that we can use the contracts in the React application
// to run: `yarn buidler run scripts/copy-artifacts-to-react.js` from the root directory
async function main() {
  await env.run("compile");

  var rootPath = path.dirname(path.dirname(require.main.filename));

  await fs.copy(
    path.join(rootPath, "/artifacts"),
    path.join(rootPath, "/src/artifacts")
  );

  console.log("success");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
