import { MailHelper } from '../helpers/mailHelper';
import { FeedbacksRepository } from '../repositories/feedbacksRepository';

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {

  private feedbacksRepository;
  private nodemailerHelper;

  constructor(feedbacksRepository: FeedbacksRepository, nodemailerHelper: MailHelper) {
    this.feedbacksRepository = feedbacksRepository;
    this.nodemailerHelper = nodemailerHelper;
  }

  async execute(request: SubmitFeedbackServiceRequest){
    const { type, comment, screenshot } = request;

    if (!type){
        throw new Error('Type is required');
    }

    if (!comment){
        throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
        throw new Error('Invalid screenshot format');
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
    
    await this.nodemailerHelper.sendMail({
      subject: 'Novo feedback cadastrado',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ?
        `<img ${'src="'+ screenshot+'"'} alt="Image sent" />`
        : `<p>Nenhuma imagem foi enviada</p>`,
        `</div>`,
      ].join('\n')
    })
    return feedback;
  }
}