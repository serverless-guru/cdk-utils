import { awscdk, ReleasableCommits } from "projen";

const project = new awscdk.AwsCdkConstructLibrary({
	// Package Details
	name: "@serverless-guru/cdk-utils",
	description:
		"A collection of opinionated utilities for AWS CDK projects, including custom constructs and CDK-Nag rules.",
	repositoryUrl: "https://github.com/serverless-guru/cdk-utils.git",
	keywords: ["aws", "cdk", "constructs", "cdk-nag"],
	copyrightOwner: "Serverless Guru",

	// Author Package Details
	author: "Serverless Guru",
	authorAddress: "https://www.serverlessguru.com/",
	authorOrganization: true,

	// Package Dependencies
	cdkVersion: "2.156.0",
	jsiiVersion: "~5.8.0",
	projenrcTs: true,
	peerDeps: ["cdk-nag"],
	devDeps: ["@aws-cdk/assert@^2.18", "all-contributors-cli"],

	// Bundling, Linting and ignore configurations
	eslint: false,
	prettier: false,
	biome: true,
	gitignore: [".vscode", "**/.DS_Store"],

	// GH Actions, Workflows and configurations
	buildWorkflow: true,
	docgen: true,
	depsUpgrade: false,
	pullRequestTemplate: false,
	stale: true,
	staleOptions: {
		issues: {
			closeMessage: "Closing Stale Issue",
			staleLabel: "STALE",
			daysBeforeStale: 180,
		},
		pullRequest: {
			closeMessage: "Closing Stale Pull Request",
			staleLabel: "STALE",
			daysBeforeStale: 30,
		},
	},
	release: true,
	releasableCommits: ReleasableCommits.featuresAndFixes(),
	githubOptions: {
		pullRequestLintOptions: {
			semanticTitleOptions: {
				types: ["feat", "fix", "docs", "chore"],
			},
		},
	},
	defaultReleaseBranch: "main",
});

project.jest!.config.transform = {
	"^.+\\.ts$": ["ts-jest", { isolatedModules: true }] as any,
};

project.package.addField("publishConfig", { access: "public" });

project.github?.addPullRequestTemplate(
	[
		"## What is this PR for?",
		"",
		"",
		"## What type of PR is it?",
		"",
		"- [ ] Bug fix",
		"- [ ] Feature",
		"- [ ] Documentation update",
		"- [ ] Other, please describe:",
		"",
		"## What is the new behavior?",
		"",
		"",
		"## Does this PR introduce a breaking change?",
		"",
		"- [ ] Yes",
		"- [ ] No",
		"",
		"## Other information",
		"",
		"",
		"## Checklist:",
		"",
		"- [ ] Code review",
		"- [ ] Tests",
		"- [ ] Documentation",
		"",
	].join("\n"),
);

project.synth();
