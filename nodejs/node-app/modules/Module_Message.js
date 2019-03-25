
const Message = require('../models/Message');


Module_Message = {
    name: 'Module_Message',
    save: function (newMessage) {
        Message.countDocuments({}).then(data => {
            var id = data + 1;
            newMessage.Message_id = id;
            new Message(newMessage).save()
                .then(message => {
                    console.log(message);

                })
        })
    }
}


module.exports = Module_Message;