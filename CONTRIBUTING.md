# Contributing Guidelines

Thank you for your interest in contributing to our project. Whether it's a bug report, new feature, correction, or additional
documentation, we greatly value feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests to ensure we have all the necessary
information to effectively respond to your bug report or contribution.

## Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check existing open, or recently closed, issues to make sure somebody else hasn't already
reported the issue. Please try to include as much information as you can. Details like these are incredibly useful:

- A reproducible test case or series of steps
- The version of our code being used
- Any modifications you've made relevant to the bug
- Anything unusual about your environment or deployment

## Contributing via Pull Requests

### Pull Request Checklist

- [ ] Testing
  - Unit test added (prefer not to modify an existing test, otherwise, it's probably a breaking change)
- [ ] Docs
  - **README**: README updated if necessary
  - **docs/RULES**: RULES updated if necessary
  - **docs/CONSTRUCTS**: CONSTRUCTS updated if necessary
- [ ] Title and Description
  - **Change type**: title prefixed with **fix**, **feat** and module name in parens, which will appear in changelog
  - **Title**: use lower-case and doesn't end with a period
  - **Breaking?**: last paragraph: "BREAKING CHANGE: <describe what changed + link for details>"
  - **Issues**: Indicate issues fixed via: "**Fixes #xxx**" or "**Closes #xxx**"

Contributions via pull requests are much appreciated. Before sending us a pull request, please ensure that:

1. You are working against the latest source on the _main_ branch.

2. You have previously discussed or disclosed the changes by creating the appropriate issue.

---

### Step 1: Open Issue

If there isn't one already, open an issue describing what you intend to contribute. It's useful to communicate in advance, because sometimes, someone is already working in this space, so maybe it's worth collaborating with them instead of duplicating the efforts.

### Step 2: Fork the repository

GitHub provides additional document on [forking a repository](https://help.github.com/articles/fork-a-repo/). Make sure you are working against the latest source on the _main_ branch.

### Step 3: Setup

The following tools need to be installed on your system prior to building `cdk-utils` locally:

- [Node.js >= 14.15.0](https://nodejs.org/download/release/latest-v14.x/)
  - We recommend using a version in [Active LTS](https://nodejs.org/en/about/releases/)
- [Yarn >= 1.19.1, < 2](https://yarnpkg.com/lang/en/docs/install)

Install dependencies

- `yarn install`
- `npx projen`

### Step 4: Develop

1. Change code
2. If relevant, add [tests](./test/)
3. Run tests
   - `npx projen test`
4. Build
   - `npx projen build`
5. Update relevant documentation
6. Create the commit with relevant files
   - Note: Please follow the [Conventional Commits 1.0.0 Specification](https://www.conventionalcommits.org/en/v1.0.0/)

### Step 5: Make the pull request

Send us a [pull request](https://help.github.com/articles/creating-a-pull-request/), answering any default questions in the pull request interface. Pay attention to any automated CI failures reported in the pull request, and stay involved in the conversation.

### Step 6: Update the Contributors List

> [!NOTE]
> This step is only required for the first contribution of each type (f.e.: Code, docs, bugs, ...)

Once your pull request is merged, add a comment on the initial issue asking the `@all-contributors` bot to add you to the list.

<details>
<summary>Comment on Issue asking @all-contributors to add a contributor:</summary>

```markdown
@all-contributors please add @<username> for <contributions>
```

</details>

Please refer the official documentation for additional details on [how to use the bot](https://allcontributors.org/docs/en/bot/usage) or the available [contribution types](https://allcontributors.org/docs/en/emoji-key).

#### All Contrtibutors CLI

For those scenarios where the `all-contributors` bot is unresponsive or you want to directly add your contribution as part of thee PR.

Steps to add contributions via the CLI
<details>
<summary>1. Add the Contribution</summary>

```bash
# Add new contributor <username>, who made a contribution of type <contribution>
npx all-contributors add <username> <contribution>
# Example:
npx all-contributors add jfmengels code,doc
```

</details>

<details>
<summary>2. Regenerate the contributors table</summary>

```bash
npx all-contributors generate
```

</details>

## Finding contributions to work on

Looking at the existing issues is a great way to find something to contribute on. As our projects, by default, use the default GitHub issue labels (enhancement/bug/duplicate/help wanted/invalid/question/wontfix), looking at any `help wanted` or `good first issue` labled issues is a great place to start.

## Licensing

See the [LICENSE](LICENSE) file for our project's licensing. We will ask you to confirm the licensing of your contribution.