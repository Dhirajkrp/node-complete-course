## Introduction

npm, which stands for Node Package Manager, is a widely used package manager for JavaScript and Node.js applications. It plays a crucial role in the JavaScript ecosystem by simplifying the process of installing, managing, and sharing code libraries (packages) and dependencies that are used in web development and server-side applications.

Here are some key points about npm:

1. **Package Management**: npm allows developers to easily install and manage libraries and packages that extend the functionality of their JavaScript and Node.js projects. These packages can include everything from small utility functions to complex frameworks.

2. **Dependency Management**: It helps track and manage dependencies, ensuring that your project has the necessary packages and their correct versions. This helps maintain consistency and avoid compatibility issues.

3. **Command-Line Interface (CLI)**: npm provides a command-line interface that allows developers to interact with the package manager, perform tasks like installing packages, updating dependencies, and publishing their own packages.

4. **Registry**: npm has a default registry where it hosts thousands of publicly available packages. Developers can publish their own packages to this registry, making it easy for others to discover and use their code.

5. **Versioning**: npm uses semantic versioning (SemVer) to specify package versions. This helps developers understand the compatibility and impact of updating packages.

6. **Scripts**: npm includes a powerful feature called "npm scripts," which allows developers to define and run custom scripts as part of their project's lifecycle. This is commonly used for tasks like building, testing, and deploying applications.

7. **Global and Local Packages**: npm can install packages globally (accessible across your entire system) or locally (scoped to a specific project).

8. **Community and Ecosystem**: npm boasts a large and active community of developers, and its extensive ecosystem of packages contributes to its popularity and versatility in the JavaScript development world.

9. **Integration**: npm is often integrated with popular development tools and frameworks, such as Node.js, React, Angular, and more, making it an integral part of modern web development workflows.

In summary, npm is a fundamental tool for JavaScript and Node.js developers, streamlining the management of dependencies and facilitating collaboration within the JavaScript community. Its ease of use and extensive package repository have made it a cornerstone of modern web development.

### CLI commands

1. **npm init**:

   - Initializes a new npm project by creating a `package.json` file. You'll be prompted to provide information about your project.

2. **npm install [package]** or **npm i [package]**:

   - Installs a package and adds it as a dependency to your project. You can specify a package name, and npm will download and install it.

3. **npm install [package] --save-dev** or **npm i [package] -D**:

   - Installs a package as a development dependency. It's typically used for packages needed during development but not in production, such as testing libraries or build tools.

   - We can use the -g flag with the installation to specify that the installed packeage is global.

4. **npm install**:

   - Installs all the dependencies listed in your `package.json` file. Use this command after cloning a project or when setting up a new development environment.

5. **npm update [package]**:

   - Updates a specific package to the latest version, if available. You can also use `npm update` to update all packages.

6. **npm uninstall [package]** or **npm remove [package]**:

   - Removes a package from your project's dependencies. It also updates the `package.json` file.

7. **npm list**:

   - Lists all installed packages and their versions in the current project. The `--depth` flag can be used to specify the depth of the dependency tree.

8. **npm search [package]**:

   - Searches the npm registry for packages matching the provided keyword.

9. **npm run [script]**:

   - Executes a script defined in the `scripts` section of your `package.json` file. Common scripts include "start," "test," "build," and others.

10. **npm info [package]**:

    - Displays detailed information about a specific package, including its latest version, dependencies, and maintainers.

11. **npm outdated**:

    - Shows a list of installed packages that have newer versions available. Useful for identifying outdated dependencies.

12. **npm publish**:

    - Publishes your package to the npm registry if you are the author or maintainer. Requires you to be logged in.

13. **npm login**:

    - Logs you into your npm account, allowing you to publish packages or access private packages.

14. **npm logout**:

    - Logs you out of your npm account.

15. **npm init -y**:
    - Initializes a new npm project with default settings, skipping the interactive prompts. This is useful for quickly creating a basic `package.json` file.

These are some of the most commonly used npm commands to get you started with managing packages and scripts in your JavaScript and Node.js projects. Remember to refer to the official npm documentation for more advanced usage and options.

## some common npm packages

1. nodemon : This works similar to the live server extension and we do not have to re-run the file everytime we make any changes.
   since we can use this in multiple projects , we can install this package globally.

```bash
npm i nodemon -g
```

the _-g_ flag specifies that this package should be installed globally.

2. date-fns: This is useful when we are working with dates , this module has a format function which takes a date obejct and the format in which we want to display the date in.

### Using the pakage.json

The `package.json` file is a crucial component of JavaScript and Node.js projects, and it serves several important purposes:

1. **Dependency Management**: One of the primary reasons for using `package.json` is to manage project dependencies. It lists all the packages (libraries and modules) that your project relies on. This includes both runtime dependencies and development dependencies. With this file, you can easily specify which versions of packages your project requires.

2. **Version Control**: Including the `package.json` file in your project allows you to version control your project's dependencies. This means that when you share your project with others or deploy it to different environments, you can ensure that everyone is using the same versions of dependencies. This reduces the risk of compatibility issues between different versions of the same package.

```js
  "dependencies": {
    "date-fns": "^2.30.0"
  }
```

The number defines the version of the dependency .

- This follows the semantic as <major_Version>.<minor_version>.<patch>
- When we use ^ symbol , it defines update minor or patch version if available.
- when we use ~ symbol ,it defines only update the path version.
- when we do not use any symbol , it does not allow any other version expext the defined version.
- when we use the \* insted of any number it defines update the package to its latest version , however this is not safe as the latest version might have some major changes which might cause some errors in the application.

3. **Project Configuration**: `package.json` is not just about dependencies. It also contains metadata about your project, including its name, description, version, author, and license information. This metadata is useful for project documentation and identification.

4. **Scripts**: The `package.json` file has a "scripts" section where you can define custom commands that are specific to your project. These scripts can be used for tasks such as starting your application, running tests, building assets, and deploying to production. They make it easy to automate common project-related tasks.
   The common scripts used are

- start
- dev
- build

To create a script we use the format

```
"<script_name>" : "<command to execute>",
"start" : "node index"
```

```js
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
```

so whenever we use the **start** the command **node index** commad is executed .To run the script we use the comman

```bash
npm run <script_name>
```

5. **Ease of Sharing**: When you share your project with others, whether it's a colleague or the broader open-source community, they can quickly understand your project's dependencies, configuration, and available scripts by looking at the `package.json` file. This makes it easier for others to contribute or work with your code.

6. **npm Commands**: npm, the Node Package Manager, uses the information in the `package.json` file to perform various tasks, such as installing dependencies (`npm install`), running scripts (`npm run`), and publishing packages (`npm publish`). Without `package.json`, npm would have no way of knowing what your project requires or how to execute custom scripts.

7. **Dependency Resolution**: When you run `npm install`, npm looks at the `package.json` file to determine which dependencies and versions to download and install. It uses the information in this file to create a dependency tree, ensuring that your project has all the required packages.

In summary, the `package.json` file is a central configuration file for JavaScript and Node.js projects. It provides a structured way to define and manage project dependencies, configuration settings, and custom scripts, making it an essential tool for efficient and reliable project development, sharing, and deployment.

### Using the gitignore

Whenever we add a package it is installed in the node*modules folder and as the number of dependencies grows , the size of the node_modules folder grows as well , thus it becomes difficult to share the project with other developer or to host it on github.
In order to solve this issue, we can use the *.gitignore\_ file , which defines what are the folders and files we do not want to host or add to our repo, and whenever we are working on a nodejs application it is always recommended to add the node_modules to the gitignore.

when someone else clones the repo they can get all the depedencies of the project using

```bash
npm install
```

This installs all the required dependencies of the project.
