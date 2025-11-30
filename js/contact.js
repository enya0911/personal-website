// ============================================
// 聯絡表單處理
// ============================================

// 表單驗證訊息（會根據語言切換更新）
const validationMessages = {
    zh: {
        required: '此欄位為必填',
        email: '請輸入有效的電子郵件地址',
        success: '表單已成功送出！我們會盡快與您聯繫。',
        error: '送出表單時發生錯誤，請稍後再試。',
        sending: '正在送出...'
    },
    en: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        success: 'Form submitted successfully! We will contact you soon.',
        error: 'An error occurred while submitting the form. Please try again later.',
        sending: 'Sending...'
    },
    ja: {
        required: 'この項目は必須です',
        email: '有効なメールアドレスを入力してください',
        success: 'フォームが正常に送信されました！できるだけ早くご連絡いたします。',
        error: 'フォーム送信中にエラーが発生しました。後でもう一度お試しください。',
        sending: '送信中...'
    }
};

// 取得當前語言
function getCurrentLang() {
    const lang = document.documentElement.lang;
    if (lang === 'zh-TW' || lang === 'zh') return 'zh';
    if (lang === 'ja') return 'ja';
    return 'en'; // 預設為英文
}

// 顯示錯誤訊息
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#d32f2f';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    input.style.borderColor = '#d32f2f';
}

// 清除錯誤訊息
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

// 驗證電子郵件格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 驗證表單欄位
function validateField(input) {
    const value = input.value.trim();
    const lang = getCurrentLang();
    const messages = validationMessages[lang];
    
    clearError(input);
    
    // 檢查必填欄位
    if (input.hasAttribute('required') && !value) {
        showError(input, messages.required);
        return false;
    }
    
    // 檢查電子郵件格式
    if (input.type === 'email' && value && !validateEmail(value)) {
        showError(input, messages.email);
        return false;
    }
    
    return true;
}

// 驗證整個表單
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 顯示成功訊息
function showSuccessMessage(form) {
    const lang = getCurrentLang();
    const messages = validationMessages[lang];
    
    // 移除現有的訊息
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 建立成功訊息
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message success-message';
    messageElement.textContent = messages.success;
    messageElement.style.cssText = `
        background-color: #4caf50;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    
    form.appendChild(messageElement);
    
    // 3秒後移除訊息
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// 顯示錯誤訊息
function showErrorMessage(form) {
    const lang = getCurrentLang();
    const messages = validationMessages[lang];
    
    // 移除現有的訊息
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 建立錯誤訊息
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message error-message';
    messageElement.textContent = messages.error;
    messageElement.style.cssText = `
        background-color: #f44336;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
    `;
    
    form.appendChild(messageElement);
    
    // 5秒後移除訊息
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// 處理表單提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const lang = getCurrentLang();
    const messages = validationMessages[lang];
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    
    // 驗證表單
    if (!validateForm(form)) {
        // 滾動到第一個錯誤欄位
        const firstError = form.querySelector('.error-message');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // 取得表單資料
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        subject: form.querySelector('#subject').value.trim(),
        message: form.querySelector('#message').value.trim()
    };
    
    // 更新按鈕狀態
    submitButton.disabled = true;
    submitButton.textContent = messages.sending;
    submitButton.style.opacity = '0.7';
    
    // 使用 mailto 連結（前端方案）
    // 注意：這需要用戶的郵件客戶端支援
    const mailtoLink = `mailto:sthou@o365.fcu.edu.tw?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`姓名: ${formData.name}\n電子郵件: ${formData.email}\n\n訊息內容:\n${formData.message}`)}`;
    
    // 嘗試開啟郵件客戶端
    try {
        window.location.href = mailtoLink;
        
        // 延遲顯示成功訊息（給郵件客戶端時間開啟）
        setTimeout(() => {
            showSuccessMessage(form);
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.opacity = '1';
        }, 1000);
    } catch (error) {
        console.error('Error opening email client:', error);
        showErrorMessage(form);
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = '1';
    }
    
    // 備用方案：如果 mailto 不工作，可以顯示表單資料供用戶複製
    // 或者可以整合後端 API 來處理表單提交
}

// 即時驗證（當用戶離開欄位時）
function initRealTimeValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // 當用戶離開欄位時驗證
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        // 當用戶輸入時清除錯誤
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(211, 47, 47)') {
                clearError(input);
            }
        });
    });
}

// 初始化表單
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    initRealTimeValidation();
}

// 當 DOM 載入完成時初始化
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

// 當語言切換時更新驗證訊息（如果需要）
// 這個功能已經通過 main.js 的語言切換功能自動處理
// 因為錯誤訊息是動態生成的，會使用當前的語言設定

