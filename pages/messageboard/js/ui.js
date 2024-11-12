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
            <div class="message" data-id="${message.id}">
                <div class="message-inner">
                    <div class="user-avatar"></div>
                    <div class="message-content">
                        <div class="message-author-line">
                            <span class="message-author">${Utils.escapeHtml(message.name)}</span>
                            <span class="message-time">${Utils.formatDate(message.timestamp)}</span>
                            <div class="message-menu">
                                <button class="menu-trigger" aria-label="更多选项">
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="currentColor" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                                    </svg>
                                </button>
                                <div class="menu-dropdown">
                                    <button class="menu-item delete-message">
                                        <svg viewBox="0 0 24 24" width="18" height="18">
                                            <path fill="currentColor" d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07z"/>
                                        </svg>
                                        <span>删除</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="message-text">${Utils.escapeHtml(message.content)}</div>
                    </div>
                </div>
            </div>
        `;
    },

    initMessageInteractions() {
        document.querySelectorAll('.message').forEach(message => {
            const menuTrigger = message.querySelector('.menu-trigger');
            const menuDropdown = message.querySelector('.menu-dropdown');
            const deleteButton = message.querySelector('.delete-message');

            // 点击菜单按钮
            menuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // 关闭其他打开的菜单
                document.querySelectorAll('.menu-dropdown.show').forEach(dropdown => {
                    if (dropdown !== menuDropdown) {
                        dropdown.classList.remove('show');
                    }
                });
                menuDropdown.classList.toggle('show');
            });

            // 点击删除按钮
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showDeleteConfirm(message);
                menuDropdown.classList.remove('show');
            });

            // 点击页面其他地方关闭菜单
            document.addEventListener('click', (e) => {
                if (!menuDropdown.contains(e.target) && !menuTrigger.contains(e.target)) {
                    menuDropdown.classList.remove('show');
                }
            });
        });
    },

    showDeleteConfirm(message) {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <p>确定要删除这条消息吗？</p>
                <div class="dialog-buttons">
                    <button class="dialog-button cancel-delete">取消</button>
                    <button class="dialog-button confirm-delete">删除</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
        setTimeout(() => dialog.classList.add('show'), 10);

        dialog.querySelector('.cancel-delete').onclick = () => {
            dialog.remove();
            message.classList.remove('show-actions');
            message.style.transform = '';
        };

        dialog.querySelector('.confirm-delete').onclick = async () => {
            const messageId = message.dataset.id;
            console.log('Attempting to delete message:', messageId); // 添加日志
            try {
                await MessageAPI.deleteMessage(messageId);
                message.remove();
                dialog.remove();
            } catch (error) {
                console.error('Delete error details:', error); // 添加详细错误日志
                this.showError('删除失败，请重试');
                dialog.remove();
            }
        };
    }
}; 