// const chatTypes = require('../constants/chatTypes');

class Message {
  constructor(message) {
    this.id = message.message_id;
    this.text = message.text;
    this.date = message.date;
    this.from = {
      isBot: message.from.is_bot,
      firstName: message.from.first_name,
      lastName: message.from.last_name,
      username: message.from.username,
      languageCode: message.from.language_code,
    };
    this.chat = {
      // COMMON
      id: message.chat.id,
      type: message.chat.type,
      // GROUP
      // title: message.chat.title,
      // PRIVATE
      // firstName: message.chat.first_name,
      // lastName: message.chat.last_name,
      // username: message.chat.username,
    };

    // this.entities = message.entities;

    // GROUP
    // if (this.chat.type === chatTypes.SUPERGROUP) {
    //   this.newChatParticipant = {
    //     id: message.new_chat_participant.id,
    //     isBot: message.new_chat_participant.is_bot,
    //     firstName: message.new_chat_participant.first_name,
    //     lastName: message.new_chat_participant.last_name,
    //     username: message.new_chat_participant.username,
    //   };
    //   this.newChatMember = {
    //     id: message.new_chat_member.id,
    //     isBot: message.new_chat_member.is_bot,
    //     firstName: message.new_chat_member.first_name,
    //     lastName: message.new_chat_member.last_name,
    //     username: message.new_chat_member.username,
    //   };
    // }
  }

  toString() {
    return `${this.id}`;
  }
}

module.exports = Message;
