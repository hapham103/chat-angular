angular.module('chat-app')
        .service('db', function($on, $emit) {
            let self = this;
            let socket = io.connect('http://localhost:3000');
            this.users = [];
            this.conversations = [];
            this.messages = [];
            this.curUser;
            this.curConversation;
            this.init = function(){
                
                self.users.push({ id: 1, avatarUrl: 'http://hinhanhdepvip.com/wp-content/uploads/2016/07/hinh-mat-cuoi-ba-dao.jpg'});
                self.curConversation = {
                    title: 'Chat App',
                    avatarUrl: 'http://hinhanhdepvip.com/wp-content/uploads/2016/07/hinh-mat-cuoi-ba-dao.jpg',
                    messages: [
                        {
                            message: 'Hãy tìm kiếm bạn bè để trò chuyện!', 
                            sender_id: 1
                        }
                    ]
                };
                self.conversations.push(self.curConversation);                                
            }
            this.getUser = function(id){
                for (let i = 0; i < self.users.length; i++)
                    if (self.users[i].id == id) 
                        return self.users[i];
            };
            this.getConversation = function(id) {
                for (let i = 0; i < self.conversations.length; i++)
                    if (self.conversations[i].id == id)
                        return {con: self.conversations[i], pos: i};
            }
            socket.on('users', function (users) {
                console.log('db cli : ', socket.id);
                self.users = users;
            });
        });