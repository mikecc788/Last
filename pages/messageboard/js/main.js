class MessageBoard {
    constructor() {
        this.bindEvents();
        this.loadMessages();
    }

    bindEvents() {
        UI.elements.submitBtn.addEventListener('click', () => this.handleSubmit());
    }

    async handleSubmit() {
        const name = UI.elements.nameInput.value;
        const content = UI.elements.messageInput.value;

        if (!Utils.validateInput(name, content)) {
            UI.showError('请填写昵称和留言内容');
            return;
        }

        try {
            const result = await MessageAPI.submitMessage(name, content);
            if (result) {
                UI.clearInputs();
                await this.loadMessages();
            } else {
                throw new Error('提交失败');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            UI.showError('提交失败，请稍后重试');
        }
    }

    async loadMessages() {
        UI.showLoading();
        try {
            const messages = await MessageAPI.getMessages();
            UI.renderMessages(messages);
            UI.initMessageInteractions();
        } catch (error) {
            console.error('Load Error:', error);
            UI.showError('加载失败，请刷新页面重试');
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new MessageBoard();
}); 