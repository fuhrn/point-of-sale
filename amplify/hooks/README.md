# Command Hooks

Command hooks can be used to run custom scripts upon Amplify CLI lifecycle events like pre-push, post-add-function, etc.

To get started, add your script files based on the expected naming convention in this directory.

Learn more about the script file naming convention, hook parameters, third party dependencies, and advanced configurations at https://docs.amplify.aws/cli/usage/command-hooks


Errors:
me aparecio "Error retrieving products [TypeError: Symbol.asyncIterator is not defined" --> lo resolvi con installing this package "npm install @azure/core-asynciterator-polyfill" and import it on the file you're using DataStore import '@azure/core-asynciterator-polyfill'