export default interface ChatPreview {
    name: string;
    avatar: string;
    body: string;
    updatedAt: string;
    type: "message" | 'chatMessage';
    id: number;
}