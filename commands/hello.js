module.exports = {
  name: "hello",
  description: "a test command",
  execute(message, args) {

    message.channel.send("Hello!😊");

  }
};
