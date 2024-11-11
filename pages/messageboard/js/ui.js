const UI = {
    elements: {
        nameInput: document.getElementById('name'),
        messageInput: document.getElementById('message'),
        submitBtn: document.getElementById('submitBtn'),
        messageList: document.getElementById('messageList')
    },

    showLoading() {
        this.elements.messageList.innerHTML = '<div class="loading">加载中...</div>';
    },

    showError(message) {
        const form = document.querySelector('.message-form');
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        form.insertBefore(error, form.firstChild);
        setTimeout(() => error.remove(), 3000);
    },

    clearInputs() {
        this.elements.nameInput.value = '';
        this.elements.messageInput.value = '';
    },

    renderMessages(messages) {
        if (messages.length === 0) {
            this.elements.messageList.innerHTML = '<div class="loading">暂无留言</div>';
            return;
        }

        this.elements.messageList.innerHTML = messages.map(message => this.createMessageHTML(message)).join('');
    },

    createMessageHTML(message) {
        return `
            <div class="message">
                <div class="message-header">
                    <span class="message-author">${Utils.escapeHtml(message.name)}</span>
                    <span class="message-time">${Utils.formatDate(message.timestamp)}</span>
                </div>
                <div class="message-content">${Utils.escapeHtml(message.content)}</div>
                <div class="message-footer">
                    <div class="message-action">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        <span>喜欢</span>
                    </div>
                    <div class="message-action">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                        <span>回复</span>
                    </div>
                </div>
            </div>
        `;
    }
}; 