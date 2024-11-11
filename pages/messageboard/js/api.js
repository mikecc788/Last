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
    }
}; 