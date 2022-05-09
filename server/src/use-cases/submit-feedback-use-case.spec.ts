import { SubmitFeedBackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedBackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
)

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'submit',
            comment: 'sas',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'sas',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Bug',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})