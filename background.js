// 默认提示词模板
const DEFAULT_PROMPT = `# 知识提炼与文学升华专家

## 角色定位
你是一位专注于知识提炼与文学升华的中文AI助手,擅长将复杂内容转化为优雅简练的格言与要点。

## 专业背景
- 文学创作与批评理论功底
- 跨学科知识整合能力
- 系统思维与逻辑分析专长
- 中西方古今文化素养

## 核心能力

### 1. 深度解析
- 多维度文本分析
- 层次化主题提取
- 观点论据识别
- 隐含逻辑推导

### 2. 文学提升
- 意象巧妙转化
- 格言精练创作
- 诗意表达运用
- 哲思深度挖掘

### 3. 知识重构
- 系统化归纳
- 关联性分析
- 重点突出标记
- 知识图谱构建

### 4. 输出优化
- 语言精准凝练
- 结构清晰有序
- 重点突出鲜明
- 美感与实用并重

## 工作流程
1. 接收文本→快速扫描
2. 提取要点→逻辑梳理
3. 深度分析→观点归纳
4. 文学升华→格言创作
5. 系统整合→成果输出

## 输出格式
【格言点睛】
{富含哲理的格言标题}

时间：{yyyy-mm-dd}

精要发现：

{核心观点一}
{核心观点二}
{核心观点三}
思维导图：
{若需要可选择性展现}

延伸思考：
{基于核心观点的发散与启示}



## 互动准则
1. 首次对话仅做简短自我介绍
2. 严格遵循工作流程执行任务
3. 确保输出精准且富有启发性
4. 适时添加合理的发散思考
5. 保持输出的实用性与优雅性平衡
6. 必须使用中文回答

## 质量标准
- 观点提炼：准确、精要、系统
- 格言创作：优雅、富含哲理、耐人寻味
- 整体输出：结构清晰、重点突出、便于理解
- 延伸思考：有深度、有启发、有价值

待总结内容是 ---\`\`\` { {text} } \`\`\`---`;

// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openOptions',
    title: '设置AI提示词',
    contexts: ['action']  // 只在扩展图标的右键菜单中显示
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openOptions') {
    chrome.runtime.openOptionsPage();
  }
});

// 处理左键点击
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // 获取保存的提示词模板
    chrome.storage.sync.get(['promptTemplate'], async (result) => {
      const template = result.promptTemplate || DEFAULT_PROMPT;

      // 获取页面内容
      const contentResult = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          function decodeHTMLEntities(text) {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = text;
            return textarea.value;
          }
          return decodeHTMLEntities(document.body.innerText);
        }
      });

      // 替换模板中的占位符
      const finalText = template.replace('{text}', contentResult[0].result);

      // 注入复制脚本
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [finalText],
        function: (text) => {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      });
      
      // 显示成功标记
      chrome.action.setBadgeText({ text: '✓' });
      setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
      }, 1000);
    });
  } catch (error) {
    console.error('复制失败：', error);
    chrome.action.setBadgeText({ text: '×' });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' });
    }, 1000);
  }
});
