const API_KEY = 'dba4a4aba502456b85ef7a060165dbc9';
const SECRET_KEY = 'F0F37B33409F20B8F3087743245D62D8';
const API_URL = 'https://api.qichacha.com/FuzzySearch/GetList';
let currentPage = 1;

// 使用模拟数据
const mockData = {
    Status: "200",
    Message: "查询成功",
    Result: [
        {
            KeyNo: "abc123",
            Name: "阿里巴巴（中国）有限公司",
            CreditCode: "91330100799655058B",
            StartDate: "2019-03-20",
            OperName: "张勇",
            Status: "存续",
            No: "330100400067581",
            Address: "浙江省杭州市余杭区文一西路969号3幢5层"
        },
        {
            KeyNo: "def456",
            Name: "腾讯科技（深圳）有限公司",
            CreditCode: "91440300708461136T",
            StartDate: "2000-02-24",
            OperName: "马化腾",
            Status: "存续",
            No: "440301103432215",
            Address: "深圳市南山区高新区科技中一路腾讯大厦"
        },
        {
            KeyNo: "ghi789",
            Name: "百度在线网络技术（北京）有限公司",
            CreditCode: "91110000802100433B",
            StartDate: "2000-01-18",
            OperName: "梁志祥",
            Status: "存续",
            No: "110108002734659",
            Address: "北京市海淀区上地十街10号"
        }
    ],
    Paging: {
        PageSize: 10,
        PageIndex: 1,
        TotalRecords: 3
    }
};

// 搜索企业
async function searchCompanies(page = 1) {
    const searchKey = document.getElementById('searchKey').value.trim();
    if (!searchKey) {
        showError('请输入搜索关键词');
        return;
    }

    showLoading();

    try {
        // 使用模拟数据进行搜索
        const filteredResults = mockData.Result.filter(company => 
            company.Name.includes(searchKey) || 
            company.OperName.includes(searchKey) || 
            company.Address.includes(searchKey)
        );

        const results = {
            ...mockData,
            Result: filteredResults,
            Paging: {
                PageSize: 10,
                PageIndex: page,
                TotalRecords: filteredResults.length
            }
        };

        // 模拟网络延迟
        setTimeout(() => {
            displayResults(results);
            updatePagination(results.Paging);
        }, 500);

    } catch (error) {
        console.error('搜索出错:', error);
        showError('搜索过程中出现错误，请稍后重试');
    }
}

// 显示搜索结果
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    
    if (!data.Result || data.Result.length === 0) {
        resultsDiv.innerHTML = '<div class="loading">未找到相关企业</div>';
        return;
    }

    resultsDiv.innerHTML = data.Result.map(company => `
        <div class="result-item">
            <div class="company-name">${company.Name}</div>
            <div class="company-info">
                <div class="info-item">
                    <span class="info-label">法定代表人：</span>
                    <span>${company.OperName}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">成立日期：</span>
                    <span>${company.StartDate}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">登记状态：</span>
                    <span>${company.Status}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">统一社会信用代码：</span>
                    <span>${company.CreditCode}</span>
                </div>
            </div>
            <div class="info-item" style="margin-top: 10px;">
                <span class="info-label">注册地址：</span>
                <span>${company.Address}</span>
            </div>
        </div>
    `).join('');
}

// 更新分页
function updatePagination(paging) {
    const paginationDiv = document.getElementById('pagination');
    const totalPages = Math.ceil(paging.TotalRecords / paging.PageSize);
    
    let buttons = '';
    
    if (paging.PageIndex > 1) {
        buttons += `<button class="page-button" onclick="searchCompanies(${paging.PageIndex - 1})">上一页</button>`;
    }
    
    for (let i = Math.max(1, paging.PageIndex - 2); i <= Math.min(totalPages, paging.PageIndex + 2); i++) {
        buttons += `<button class="page-button ${i === paging.PageIndex ? 'active' : ''}" 
                   onclick="searchCompanies(${i})">${i}</button>`;
    }
    
    if (paging.PageIndex < totalPages) {
        buttons += `<button class="page-button" onclick="searchCompanies(${paging.PageIndex + 1})">下一页</button>`;
    }
    
    paginationDiv.innerHTML = buttons;
}

// 显示加载状态
function showLoading() {
    document.getElementById('results').innerHTML = '<div class="loading">搜索中...</div>';
}

// 显示错误信息
function showError(message) {
    document.getElementById('results').innerHTML = `
        <div class="error-message">${message}</div>
    `;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 添加回车键搜索支持
    document.getElementById('searchKey').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCompanies(1);
        }
    });

    // 添加省份数据
    const provinces = [
        { code: "110000", name: "北京市" },
        { code: "310000", name: "上海市" },
        { code: "440000", name: "广东省" },
        { code: "330000", name: "浙江省" }
    ];

    const provinceSelect = document.getElementById('provinceCode');
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.code;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
    });
}); 