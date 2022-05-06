import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe('Submit feedback', () => (
  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'testing comment',
      screenshot: 'data:image/png;base64, testbase64'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(createFeedbackSpy).toHaveBeenCalled();
  }),

  it('should not be able to submit feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'testing comment',
      screenshot: 'data:image/png;base64, testbase64'
    })).rejects.toThrow('Type is required');
  }), 

  it('should not be able to submit feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: '',
      screenshot: 'data:image/png;base64, testbase64'
    })).rejects.toThrow('Comment is required');
  }),

  it('should not be able to submit feedback without a screenshot on png format', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'testing comment',
      screenshot: 'data:image/jpg;base64, testbase64'
    })).rejects.toThrow('Invalid screenshot format');
  }),

  it('should be able to submit feedback without a screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'testing comment',
      screenshot: ''
    })).resolves.not.toThrow();
  })
));