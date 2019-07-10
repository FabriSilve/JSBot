export interface IMessage {
  chat: {
    id: string,
  },
  text: string,
}

class Message {
  chatId: string;
  text: string;

  constructor(message : IMessage) {
    this.chatId = message.chat.id;
    this.text = message.text;
  }
}

export default Message;