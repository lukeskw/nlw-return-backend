import { prismaDB } from "../../prisma";
import { FeedbackeDataCreation, FeedbacksRepository } from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type,comment,screenshot}: FeedbackeDataCreation){
      const response = await prismaDB.feedback.create({
        data: {
          type: type,
          comment: comment,
          screenshot: screenshot,
        }
      })
      return response;
  };
}