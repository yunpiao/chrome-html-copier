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

// 加载保存的提示词
document.addEventListener('DOMContentLoaded', () => {
    // 加载保存的提示词
    chrome.storage.sync.get(['promptTemplate'], (result) => {
        document.getElementById('promptTemplate').value = result.promptTemplate || DEFAULT_PROMPT;
    });

    // 保存按钮
    document.getElementById('save').addEventListener('click', () => {
        const template = document.getElementById('promptTemplate').value;
        chrome.storage.sync.set({ promptTemplate: template }, () => {
            const status = document.getElementById('status');
            status.textContent = '设置已保存！';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        });
    });

    // 重置按钮
    document.getElementById('reset').addEventListener('click', () => {
        document.getElementById('promptTemplate').value = DEFAULT_PROMPT;
        chrome.storage.sync.set({ promptTemplate: DEFAULT_PROMPT }, () => {
            const status = document.getElementById('status');
            status.textContent = '已恢复默认设置！';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        });
    });
});
