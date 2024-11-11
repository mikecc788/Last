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
            await MessageAPI.submitMessage(name, content);
            UI.clearInputs();
            this.loadMessages();
        } catch (error) {
            UI.showError('提交失败，请稍后重试');
        }
    }

    async loadMessages() {
        UI.showLoading();
        try {
            const messages = await MessageAPI.getMessages();
            UI.renderMessages(messages);
        } catch (error) {
            UI.showError('加载失败，请刷新页面重试');
        }
    }
}

// 在 main.js 中使用事件监听器
document.getElementById('submitBtn').addEventListener('click', async function() {
    const name = UI.elements.nameInput.value;
    const content = UI.elements.messageInput.value;

    if (!Utils.validateInput(name, content)) {
        UI.showError('请填写昵称和留言内容');
        return;
    }

    try {
        await MessageAPI.submitMessage(name, content);
        UI.clearInputs();
        loadMessages();
    } catch (error) {
        UI.showError('提交失败，请稍后重试');
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new MessageBoard();
}); 