# Action to post data to an Mantle Deployment Endpoint within your WordPress Website
## Code in Main

Install the dependencies

```bash
yarn install
```

## Inputs

* mantle-uri : The full path to your install's `wp-json/mantle/v1/deployments` endpoint including http://yourdomain.com/
* mantle-secret : The secret key used to communicate with mantle (provided within Mantle during setup, or in the settings)
* mantle-payload : json object with all the data you are passing to Mantle

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: linchpin/send-to-mantle@v1
with:
  mantle-url: https://mysite.com/wp-json/mantle/v1/deployments
  mantle-secret: "y8n9B4736F"
  mantle-payload: "{"data":"goes here"}"
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
