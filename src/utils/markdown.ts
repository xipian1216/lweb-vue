import { marked } from 'marked'

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

const slugMap = new Map<string, number>();

function slugify(text: string): string {
  // 保留中文、英文和数字，其他字符换成 "-"
  let slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-");

  // 避免重复 id
  const count = slugMap.get(slug) || 0;
  slugMap.set(slug, count + 1);

  if (count > 0) {
    slug += "-" + count;
  }

  return slug;
}

const headingsList: HeadingItem[] = [];

const renderer = new marked.Renderer();

renderer.heading = ({ tokens, depth }) => {
  const text = tokens.map(t => {
    if ('text' in t) return t.text;
    if ('raw' in t) return t.raw;
    return '';
  }).join("");
  
  const id = slugify(text);
  
  // 记录标题
  if (depth >= 1 && depth <= 4) {
    headingsList.push({
      id,
      text,
      level: depth
    });
  }
  
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

// 添加样式修复
renderer.paragraph = ({ text }) => {
  return `<p>${text}</p>`;
};

renderer.codespan = ({ text }) => {
  return `<code>${text}</code>`;
};

marked.use({ renderer });

export async function formatMarkdown(content: string): Promise<{ html: string; headings: HeadingItem[] }> {
  if (!content) return { html: '', headings: [] };
  
  headingsList.length = 0;
  const html = await marked.parse(content);
  
  return {
    html,
    headings: [...headingsList]
  };
}
