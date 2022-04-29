import {
  createCommitRecordV1Controller,
  getCommitRecordsController,
  getCommitRecordWithBaseController,
} from '../../controllers/commitRecordsController';
import { createProjectController } from '../../controllers/projectsController';
import {
  CreateCommitRecordV1RequestSchema,
  GetCommitRecordsRequestSchema,
  GetCommitRecordRequestSchema,
  CreateGithubCheckRequestSchema,
  CreateGithubCommitStatusRequestSchema,
  PostGithubPRCommentRequestSchema,
  GithubOutputV1RequestSchema,
  GetSubprojectsRequestSchema,
} from '../../consts/schemas';

import type { FastifyPluginCallback } from 'fastify';
import {
  createGithubCheckController,
  createGithubCommitStatusController,
  postGithubPRCommentController,
  githubOutputV1Controller,
} from '../../controllers/githubController';
import { getSubprojectsController } from '../../controllers/subprojectsController';

const commitRecordRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.get('/base', { schema: GetCommitRecordRequestSchema.properties }, getCommitRecordWithBaseController);

  done();
};

const commitRecordsRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.get('/', { schema: GetCommitRecordsRequestSchema.properties }, getCommitRecordsController);
  app.post('/', { schema: CreateCommitRecordV1RequestSchema.properties }, createCommitRecordV1Controller);

  app.register(commitRecordRoutes, { prefix: '/:commitRecordId' });

  done();
};

const outputsRoutes: FastifyPluginCallback = (app, _opts, done) => {
  // bundlemon > v0.4.0
  app.post('/github', { schema: GithubOutputV1RequestSchema.properties }, githubOutputV1Controller);

  // bundlemon <= v0.4.0
  app.post('/github/check-run', { schema: CreateGithubCheckRequestSchema.properties }, createGithubCheckController);
  app.post(
    '/github/commit-status',
    { schema: CreateGithubCommitStatusRequestSchema.properties },
    createGithubCommitStatusController
  );
  app.post(
    '/github/pr-comment',
    { schema: PostGithubPRCommentRequestSchema.properties },
    postGithubPRCommentController
  );

  done();
};

const subprojectsRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.get('/', { schema: GetSubprojectsRequestSchema.properties }, getSubprojectsController);

  done();
};

const projectRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.register(commitRecordsRoutes, { prefix: '/commit-records' });
  app.register(outputsRoutes, { prefix: '/outputs' });
  app.register(subprojectsRoutes, { prefix: '/subprojects' });

  done();
};

const projectsRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.post('/', createProjectController);

  app.register(projectRoutes, { prefix: '/:projectId' });

  done();
};

const v1Routes: FastifyPluginCallback = (app, _opts, done) => {
  app.register(projectsRoutes, { prefix: '/projects' });

  done();
};

export default v1Routes;
