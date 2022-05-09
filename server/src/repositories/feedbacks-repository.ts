export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbackRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}