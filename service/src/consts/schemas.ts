export const BaseRequestSchema = {
  $id: '#/definitions/BaseRequestSchema',
  type: 'object',
  properties: {
    body: {},
    query: {},
    params: {},
    headers: {},
  },
  additionalProperties: false,
};

export const BaseGetRequestSchema = {
  $id: '#/definitions/BaseGetRequestSchema',
  type: 'object',
  properties: {
    query: {},
    params: {},
    headers: {},
  },
  additionalProperties: false,
};

export const ProjectAuthV1Headers = {
  $id: '#/definitions/ProjectAuthV1Headers',
  type: 'object',
  properties: {
    'bundlemon-auth-type': {
      type: 'string',
      const: 'API_KEY',
    },
    'x-api-key': {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['x-api-key'],
  additionalProperties: false,
};

export const ProjectAuthV2Headers = {
  $id: '#/definitions/ProjectAuthV2Headers',
  type: 'object',
  properties: {
    'bundlemon-auth-type': {
      type: 'string',
      const: 'API_KEY',
    },
    'bundlemon-project-id': {
      type: 'string',
      minLength: 1,
    },
    'x-api-key': {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['bundlemon-auth-type', 'bundlemon-project-id', 'x-api-key'],
  additionalProperties: false,
};

export const GithubActionsAuthHeaders = {
  $id: '#/definitions/GithubActionsAuthHeaders',
  type: 'object',
  properties: {
    'bundlemon-auth-type': {
      type: 'string',
      const: 'GITHUB_ACTION',
    },
    'github-owner': {
      type: 'string',
      minLength: 1,
    },
    'github-repo': {
      type: 'string',
      minLength: 1,
    },
    'github-run-id': {
      type: 'string',
      minLength: 1,
      pattern: '^\\d+$',
    },
  },
  required: ['bundlemon-auth-type', 'github-owner', 'github-repo', 'github-run-id'],
  additionalProperties: false,
};

export const AuthHeadersV1 = {
  $id: '#/definitions/AuthHeadersV1',
  anyOf: [
    {
      type: 'object',
      properties: {
        'bundlemon-auth-type': {
          type: 'string',
          const: 'API_KEY',
        },
        'x-api-key': {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['x-api-key'],
    },
    {
      type: 'object',
      properties: {
        'bundlemon-auth-type': {
          type: 'string',
          const: 'GITHUB_ACTION',
        },
        'github-owner': {
          type: 'string',
          minLength: 1,
        },
        'github-repo': {
          type: 'string',
          minLength: 1,
        },
        'github-run-id': {
          type: 'string',
          minLength: 1,
          pattern: '^\\d+$',
        },
      },
      required: ['bundlemon-auth-type', 'github-owner', 'github-repo', 'github-run-id'],
    },
  ],
};

export const AuthHeadersV2 = {
  $id: '#/definitions/AuthHeadersV2',
  anyOf: [
    {
      type: 'object',
      properties: {
        'bundlemon-auth-type': {
          type: 'string',
          const: 'API_KEY',
        },
        'bundlemon-project-id': {
          type: 'string',
          minLength: 1,
        },
        'x-api-key': {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['bundlemon-auth-type', 'bundlemon-project-id', 'x-api-key'],
    },
    {
      type: 'object',
      properties: {
        'bundlemon-auth-type': {
          type: 'string',
          const: 'GITHUB_ACTION',
        },
        'github-owner': {
          type: 'string',
          minLength: 1,
        },
        'github-repo': {
          type: 'string',
          minLength: 1,
        },
        'github-run-id': {
          type: 'string',
          minLength: 1,
          pattern: '^\\d+$',
        },
      },
      required: ['bundlemon-auth-type', 'github-owner', 'github-repo', 'github-run-id'],
    },
  ],
};

export const CreateCommitRecordV1RequestSchema = {
  $id: '#/definitions/CreateCommitRecordV1RequestSchema',
  type: 'object',
  properties: {
    body: {
      $ref: '#/definitions/CommitRecordPayload',
    },
    query: {},
    params: {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    headers: {
      $ref: '#/definitions/AuthHeadersV1',
    },
  },
  required: ['body', 'params', 'headers'],
  additionalProperties: false,
};

export const CommitRecordPayload = {
  $id: '#/definitions/CommitRecordPayload',
  type: 'object',
  properties: {
    subProject: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9_\\-. ]*$',
    },
    files: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetails',
      },
    },
    groups: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetails',
      },
    },
    branch: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    commitSha: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9]*$',
    },
    baseBranch: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    prNumber: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
      pattern: '^[0-9]*$',
    },
  },
  required: ['files', 'groups', 'branch', 'commitSha'],
  additionalProperties: false,
};

export const FileDetails = {
  $id: '#/definitions/FileDetails',
  type: 'object',
  properties: {
    pattern: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    compression: {
      $ref: '#/definitions/Compression',
    },
    maxSize: {
      type: 'number',
    },
    maxPercentIncrease: {
      type: 'number',
    },
  },
  required: ['pattern', 'path', 'size', 'compression'],
  additionalProperties: false,
};

export const Compression = {
  $id: '#/definitions/Compression',
  type: 'string',
  enum: ['none', 'gzip', 'brotli'],
};

export const ProjectOwnerDetails = {
  $id: '#/definitions/ProjectOwnerDetails',
  type: 'object',
  properties: {
    projectId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
  required: ['projectId'],
  additionalProperties: false,
};

export const CreateCommitRecordV2RequestSchema = {
  $id: '#/definitions/CreateCommitRecordV2RequestSchema',
  type: 'object',
  properties: {
    body: {
      $ref: '#/definitions/CommitRecordPayload',
    },
    query: {},
    params: {},
    headers: {
      $ref: '#/definitions/AuthHeadersV2',
    },
  },
  required: ['body', 'headers'],
  additionalProperties: false,
};

export const GetCommitRecordRequestSchema = {
  $id: '#/definitions/GetCommitRecordRequestSchema',
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        compareTo: {
          $ref: '#/definitions/BaseRecordCompareTo',
          default: 'PREVIOUS_COMMIT',
        },
      },
      additionalProperties: false,
    },
    params: {
      anyOf: [
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            commitRecordId: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
            },
            projectId: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
            },
          },
          required: ['commitRecordId', 'projectId'],
        },
        {
          type: 'object',
          additionalProperties: false,
          properties: {
            commitRecordId: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
            },
            provider: {
              $ref: '#/definitions/GitProvider',
            },
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
          },
          required: ['commitRecordId', 'owner', 'provider', 'repo'],
        },
      ],
    },
    headers: {},
  },
  required: ['params', 'query'],
  additionalProperties: false,
};

export const GitProvider = {
  $id: '#/definitions/GitProvider',
  type: 'string',
  const: 'github',
};

export const BaseRecordCompareTo = {
  $id: '#/definitions/BaseRecordCompareTo',
  type: 'string',
  enum: ['PREVIOUS_COMMIT', 'LATEST_COMMIT'],
};

export const GetCommitRecordsQuery = {
  $id: '#/definitions/GetCommitRecordsQuery',
  type: 'object',
  properties: {
    branch: {
      type: 'string',
    },
    latest: {
      type: 'boolean',
    },
    resolution: {
      $ref: '#/definitions/CommitRecordsQueryResolution',
    },
    subProject: {
      type: 'string',
    },
    olderThan: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['branch'],
  additionalProperties: false,
};

export const CommitRecordsQueryResolution = {
  $id: '#/definitions/CommitRecordsQueryResolution',
  type: 'string',
  enum: ['all', 'days', 'weeks', 'months'],
};

export const GetCommitRecordsRequestSchema = {
  $id: '#/definitions/GetCommitRecordsRequestSchema',
  type: 'object',
  properties: {
    query: {
      $ref: '#/definitions/GetCommitRecordsQuery',
    },
    params: {
      $ref: '#/definitions/OwnerDetails',
    },
    headers: {},
  },
  required: ['params', 'query'],
  additionalProperties: false,
};

export const OwnerDetails = {
  $id: '#/definitions/OwnerDetails',
  anyOf: [
    {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    {
      $ref: '#/definitions/GitOwnerDetails',
    },
  ],
};

export const GitOwnerDetails = {
  $id: '#/definitions/GitOwnerDetails',
  type: 'object',
  properties: {
    provider: {
      $ref: '#/definitions/GitProvider',
    },
    owner: {
      type: 'string',
    },
    repo: {
      type: 'string',
    },
  },
  required: ['provider', 'owner', 'repo'],
  additionalProperties: false,
};

export const CreateGithubCheckRequestSchema = {
  $id: '#/definitions/CreateGithubCheckRequestSchema',
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        report: {
          $ref: '#/definitions/Report',
        },
        git: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
            commitSha: {
              type: 'string',
            },
          },
          required: ['owner', 'repo', 'commitSha'],
          additionalProperties: false,
        },
      },
      required: ['report', 'git'],
      additionalProperties: false,
    },
    query: {},
    params: {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    headers: {
      type: 'object',
      properties: {
        'x-api-key': {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['x-api-key'],
      additionalProperties: false,
    },
  },
  required: ['body', 'params', 'headers'],
  additionalProperties: false,
};

export const Report = {
  $id: '#/definitions/Report',
  type: 'object',
  properties: {
    files: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetailsDiff',
      },
    },
    stats: {
      $ref: '#/definitions/DiffStats',
    },
    groups: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetailsDiff',
      },
    },
    status: {
      $ref: '#/definitions/Status',
    },
    metadata: {
      $ref: '#/definitions/ReportMetadata',
    },
  },
  required: ['files', 'groups', 'metadata', 'stats', 'status'],
  additionalProperties: false,
};

export const DiffReport = {
  $id: '#/definitions/DiffReport',
  type: 'object',
  properties: {
    files: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetailsDiff',
      },
    },
    stats: {
      $ref: '#/definitions/DiffStats',
    },
    groups: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetailsDiff',
      },
    },
    status: {
      $ref: '#/definitions/Status',
    },
  },
  required: ['files', 'stats', 'groups', 'status'],
  additionalProperties: false,
};

export const FileDetailsDiff = {
  $id: '#/definitions/FileDetailsDiff',
  anyOf: [
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        status: {
          type: 'string',
          const: 'Pass',
        },
        failReasons: {
          not: {},
        },
        diff: {
          $ref: '#/definitions/DiffFromBase',
        },
        pattern: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        size: {
          type: 'number',
        },
        compression: {
          $ref: '#/definitions/Compression',
        },
        maxSize: {
          type: 'number',
        },
        maxPercentIncrease: {
          type: 'number',
        },
      },
      required: ['compression', 'diff', 'path', 'pattern', 'size', 'status'],
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        status: {
          type: 'string',
          const: 'Fail',
        },
        failReasons: {
          type: 'array',
          items: {
            $ref: '#/definitions/FailReason',
          },
        },
        diff: {
          $ref: '#/definitions/DiffFromBase',
        },
        pattern: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        size: {
          type: 'number',
        },
        compression: {
          $ref: '#/definitions/Compression',
        },
        maxSize: {
          type: 'number',
        },
        maxPercentIncrease: {
          type: 'number',
        },
      },
      required: ['compression', 'diff', 'failReasons', 'path', 'pattern', 'size', 'status'],
    },
  ],
};

export const DiffFromBase = {
  $id: '#/definitions/DiffFromBase',
  type: 'object',
  properties: {
    bytes: {
      type: 'number',
    },
    percent: {
      type: 'number',
    },
    change: {
      $ref: '#/definitions/DiffChange',
    },
  },
  required: ['bytes', 'percent', 'change'],
  additionalProperties: false,
};

export const DiffChange = {
  $id: '#/definitions/DiffChange',
  type: 'string',
  enum: ['No change', 'Update', 'Add', 'Remove'],
};

export const FailReason = {
  $id: '#/definitions/FailReason',
  type: 'string',
  enum: ['MaxSize', 'MaxPercentIncrease'],
};

export const DiffStats = {
  $id: '#/definitions/DiffStats',
  type: 'object',
  properties: {
    currBranchSize: {
      type: 'number',
    },
    baseBranchSize: {
      type: 'number',
    },
    diff: {
      type: 'object',
      properties: {
        bytes: {
          type: 'number',
        },
        percent: {
          type: 'number',
        },
      },
      required: ['bytes', 'percent'],
      additionalProperties: false,
    },
  },
  required: ['currBranchSize', 'baseBranchSize', 'diff'],
  additionalProperties: false,
};

export const Status = {
  $id: '#/definitions/Status',
  type: 'string',
  enum: ['Pass', 'Fail'],
};

export const ReportMetadata = {
  $id: '#/definitions/ReportMetadata',
  type: 'object',
  properties: {
    subProject: {
      type: 'string',
    },
    linkToReport: {
      type: 'string',
    },
    record: {
      $ref: '#/definitions/CommitRecord',
    },
    baseRecord: {
      $ref: '#/definitions/CommitRecord',
    },
  },
  additionalProperties: false,
};

export const CommitRecord = {
  $id: '#/definitions/CommitRecord',
  type: 'object',
  properties: {
    subProject: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9_\\-. ]*$',
    },
    files: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetails',
      },
    },
    groups: {
      type: 'array',
      items: {
        $ref: '#/definitions/FileDetails',
      },
    },
    branch: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    commitSha: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[A-Za-z0-9]*$',
    },
    baseBranch: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    prNumber: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
      pattern: '^[0-9]*$',
    },
    id: {
      type: 'string',
    },
    projectId: {
      type: 'string',
    },
    creationDate: {
      type: 'string',
    },
  },
  required: ['branch', 'commitSha', 'creationDate', 'files', 'groups', 'id', 'projectId'],
  additionalProperties: false,
};

export const CreateGithubCommitStatusRequestSchema = {
  $id: '#/definitions/CreateGithubCommitStatusRequestSchema',
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        report: {
          $ref: '#/definitions/Report',
        },
        git: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
            commitSha: {
              type: 'string',
            },
          },
          required: ['owner', 'repo', 'commitSha'],
          additionalProperties: false,
        },
      },
      required: ['report', 'git'],
      additionalProperties: false,
    },
    query: {},
    params: {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    headers: {
      type: 'object',
      properties: {
        'x-api-key': {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['x-api-key'],
      additionalProperties: false,
    },
  },
  required: ['body', 'params', 'headers'],
  additionalProperties: false,
};

export const PostGithubPRCommentRequestSchema = {
  $id: '#/definitions/PostGithubPRCommentRequestSchema',
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        report: {
          $ref: '#/definitions/Report',
        },
        git: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
            prNumber: {
              type: 'string',
            },
          },
          required: ['owner', 'repo', 'prNumber'],
          additionalProperties: false,
        },
      },
      required: ['report', 'git'],
      additionalProperties: false,
    },
    query: {},
    params: {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    headers: {
      type: 'object',
      properties: {
        'x-api-key': {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['x-api-key'],
      additionalProperties: false,
    },
  },
  required: ['body', 'params', 'headers'],
  additionalProperties: false,
};

export const GithubOutputV1RequestSchema = {
  $id: '#/definitions/GithubOutputV1RequestSchema',
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        report: {
          $ref: '#/definitions/Report',
        },
        git: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
            commitSha: {
              type: 'string',
            },
            prNumber: {
              type: 'string',
            },
          },
          required: ['owner', 'repo', 'commitSha'],
          additionalProperties: false,
        },
        output: {
          type: 'object',
          properties: {
            checkRun: {
              type: 'boolean',
            },
            commitStatus: {
              type: 'boolean',
            },
            prComment: {
              type: 'boolean',
            },
          },
          additionalProperties: false,
        },
      },
      required: ['report', 'git', 'output'],
      additionalProperties: false,
    },
    query: {},
    params: {
      $ref: '#/definitions/ProjectOwnerDetails',
    },
    headers: {
      $ref: '#/definitions/AuthHeadersV1',
    },
  },
  required: ['body', 'params', 'headers'],
  additionalProperties: false,
};

export const GithubOutputV2RequestSchema = {
  $id: '#/definitions/GithubOutputV2RequestSchema',
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        report: {
          $ref: '#/definitions/Report',
        },
        git: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
            },
            repo: {
              type: 'string',
            },
            commitSha: {
              type: 'string',
            },
            prNumber: {
              type: 'string',
            },
          },
          required: ['owner', 'repo', 'commitSha'],
          additionalProperties: false,
        },
        output: {
          type: 'object',
          properties: {
            checkRun: {
              type: 'boolean',
            },
            commitStatus: {
              type: 'boolean',
            },
            prComment: {
              type: 'boolean',
            },
          },
          additionalProperties: false,
        },
      },
      required: ['report', 'git', 'output'],
      additionalProperties: false,
    },
    query: {},
    params: {},
    headers: {
      $ref: '#/definitions/AuthHeadersV2',
    },
  },
  required: ['body', 'headers'],
  additionalProperties: false,
};

export const GetSubprojectsRequestSchema = {
  $id: '#/definitions/GetSubprojectsRequestSchema',
  type: 'object',
  properties: {
    query: {},
    params: {
      $ref: '#/definitions/OwnerDetails',
    },
    headers: {},
  },
  required: ['params'],
  additionalProperties: false,
};
