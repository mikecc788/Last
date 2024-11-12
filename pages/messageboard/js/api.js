const MessageAPI = {
    API_URL: 'https://message-board.mikechen-326.workers.dev/api',

    async submitMessage(name, content) {
        try {
            const response = await fetch(`${this.API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    content,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) throw new Error('提交失败');
            return true;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async getMessages() {
        try {
            const response = await fetch(`${this.API_URL}/messages`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async deleteMessage(messageId) {
        try {
            console.log('Sending delete request for message:', messageId);
            const response = await fetch(`${this.API_URL}/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Delete response status:', response.status);

            if (!response.ok){
                const error = await response.json();
                throw new Error(error.error || '删除失败');
            }
            return true;
        } catch (error) {
            console.error('Delete Error:', error);
            throw error;
        }
    }
}; 