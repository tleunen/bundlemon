import {
  GithubOutputResponse,
  GithubOutputTypes,
  OutputResponse,
  Report,
  Status,
  getReportConclusionText,
} from 'bundlemon-utils';
import { createCheck, createCommitStatus, createOrUpdatePRComment, genCommentIdentifier } from '../../framework/github';
import { generateReportMarkdownWithLinks } from './markdownReportGenerator';
import { promiseAllObject } from '../../utils/promiseUtils';

import type { FastifyLoggerInstance } from 'fastify';
import type { Octokit } from '@octokit/rest';

interface CreateGithubOutputParams {
  git: {
    owner: string;
    repo: string;
    commitSha: string;
    prNumber?: string;
  };
  output: Partial<Record<GithubOutputTypes, boolean>>;
  report: Report;
  subProject?: string;
  installationOctokit: Octokit;
  log: FastifyLoggerInstance;
}

export async function createGithubOutputs({
  git: { owner, repo, commitSha, prNumber },
  output,
  report,
  subProject,
  installationOctokit,
  log,
}: CreateGithubOutputParams) {
  const tasks: Partial<Record<GithubOutputTypes, Promise<OutputResponse>>> = {};

  if (output.checkRun) {
    const summary = generateReportMarkdownWithLinks(report);

    tasks.checkRun = createCheck({
      subProject,
      owner,
      repo,
      commitSha,
      installationOctokit,
      detailsUrl: report.metadata.linkToReport || undefined,
      title: getReportConclusionText(report),
      summary,
      conclusion: report.status === Status.Pass ? 'success' : 'failure',
      log: log,
    });
  }

  if (output.commitStatus) {
    tasks.commitStatus = createCommitStatus({
      subProject,
      owner,
      repo,
      commitSha,
      installationOctokit,
      state: report.status === Status.Pass ? 'success' : 'error',
      description: getReportConclusionText(report),
      targetUrl: report.metadata.linkToReport || undefined,
      log: log,
    });
  }

  if (output.prComment) {
    const title = subProject ? `BundleMon (${subProject})` : 'BundleMon';
    const body = `${genCommentIdentifier(subProject)}\n## ${title}\n${generateReportMarkdownWithLinks(report)}`;

    tasks.prComment = createOrUpdatePRComment({
      subProject,
      owner,
      repo,
      prNumber,
      installationOctokit,
      body,
      log: log,
    });
  }

  const response: GithubOutputResponse = await promiseAllObject(tasks);

  return response;
}
