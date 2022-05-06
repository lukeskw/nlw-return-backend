export interface FeedbackeDataCreation {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data:FeedbackeDataCreation) => Promise<object|void>;
};