const MessageAPI = {
    // API_URL: 'https://api.last77.org/api',
    API_URL: 'https://message-board.mikechen-326.workers.dev/api',
    async fetchWithRetry(url, options, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (response.ok) return response;
            } catch (error) {
                if (i === retries - 1) throw error;
                // 等待一段时间后重试
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
        throw new Error('请求失败，请检查网络连接');
    },

    async submitMessage(name, content) {
        try {
            const response = await this.fetchWithRetry(`${this.API_URL}/messages`, {
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
            const response = await this.fetchWithRetry(`${this.API_URL}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async deleteMessage(messageId) {
        try {
            const response = await this.fetchWithRetry(`${this.API_URL}/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return true;
        } catch (error) {
            console.error('Delete Error:', error);
            throw error;
        }
    }
}; 