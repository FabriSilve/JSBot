db.handlers.insertMany([{
  handler: 'regex',
  input: '(^dog .*|.* dog$|.* dog .*)',
  answers: [{
    value: 'I like dogs!',
    type: 'text',
  }, {
    value: 'I prefer cats sometime...',
  }, {
    value: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Cat.gif',
    type: 'animation',
  }],
}, {
  input: '(^greet |.* greet )',
  handler: 'regex',
  answers: [{
    value: 'Good morning {}',
    type: 'text',
  }, {
    value: 'A kind hello to {}',
  }],
  args: true,
}, {
  input: 'start',
  handler: 'command',
  answers: [{
    value: 'This is a *start* command',
  }],
}, {
  input: 'decorate',
  handler: 'command',
  answers: [{
    value: '*{}*',
  }, {
    value: 'ciao _{}_',
  }],
  args: true,
}, {
  input: '.*gif.*',
  handler: 'regex',
  answers: [{
    value: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Cat.gif',
    type: 'animation',
  }],
}, {
  input: 'delete',
  handler: 'command',
  answers: [{
    value: 'The previous message is deleted',
  }],
  hideCaller: true,
}, {
  input: 'timeout',
  handler: 'command',
  answers: [{
    value: 'This message will desapear soon',
  }],
  timeout: 5,
}, {
  input: 'voice',
  handler: 'action',
  answers: [{
    value: 'That is an amazing voice!',
  }],
}, {
  input: 'photo',
  handler: 'action',
  answers: [{
    value: 'This is a great photo',
  }],
}, {
  input: 'user-added',
  handler: 'action',
  answers: [{
    value: 'Welcome in the group',
  }],
}, {
  input: 'user-left',
  handler: 'action',
  answers: [{
    value: "I don't like goodbyes",
  }],
}, {
  input: 'flow',
  handler: 'command',
  answers: [{
    value: [
      {
        value: 'https://fabrisilve.github.io/RichardMedia/audio/123.mp3',
        type: 'audio',
      },
      {
        value: 'https://fabrisilve.github.io/RichardMedia/gif/pollo.mp4',
        type: 'animation',
      },
    ],
    type: 'flow',
  }],
}, {
  input: 'multi',
  handler: 'command',
  answers: [{
    value: [
      {
        value: 'Message case 1',
      },
      {
        value: 'Message case 2',
      },
    ],
    type: 'multi',
  }],
}, {
  input: 'nested',
  handler: 'command',
  answers: [{
    value: [
      {
        value: 'Message case 1',
      },
      {
        value: 'Message case 2',
      },
    ],
    type: 'multi',
  }],
}, {
  input: 'complex',
  handler: 'command',
  args: true,
  answers: [{
    value: [
      {
        value: {
          value: [
            {
              value: 'Message one random 1',
            },
            {
              value: 'Message one random 2',
            },
          ],
          type: 'multi',
        },
        key: 'one',
      },
      {
        value: 'Message two case 2',
        key: 'two',
      },
    ],
    type: 'key',
  }],
}, {
  input: 'voice',
  handler: 'command',
  answers: [{
    value: 'https://fabrisilve.github.io/RichardMedia/123.ogg',
    type: 'voice',
  }],
}, {
  input: 'audio',
  handler: 'command',
  answers: [{
    value: 'https://fabrisilve.github.io/RichardMedia/audio/123.mp3',
    type: 'audio',
  }],
}, {
  input: 'channel',
  handler: 'command',
  answers: [{
    value: "Thank you, I'll let the admins know that ;)",
  }],
  args: true,
  channel: '@BotsNotification',
}, {
  input: 'ban',
  handler: 'command',
  answers: [{
    value: 'Chat Banned!',
  }],
  service: 'ban',
  args: true,
}, {
  input: 'unban',
  handler: 'command',
  answers: [{
    value: 'Chat Unanned!',
  }],
  service: 'unban',
  args: true,
}]);
console.log('DONE');
