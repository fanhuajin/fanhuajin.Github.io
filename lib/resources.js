// Static data adapter for the Karakeep-style client. No API or account is needed.
export function selectResources(items, { page = 'home', query = '', tag = '', sort = 'newest' } = {}) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const selected = items.filter(item => {
    if (page.startsWith('list/') && !item.lists.includes(page.slice(5))) return false;
    if (tag && !item.tags.includes(tag)) return false;
    const text = [item.name, item.subtitle, item.description, item.category, item.url, item.note, item.usage, item.platform, item.keywords, ...item.tags].filter(Boolean).join(' ').toLocaleLowerCase();
    return terms.every(term => text.includes(term));
  });
  if (sort === 'newest') selected.reverse();
  // Keep websites ahead of downloads; sorting applies within each resource type.
  return selected.sort((a, b) => Number(a.type !== 'bookmark') - Number(b.type !== 'bookmark'));
}

export function collectTags(items) {
  const counts = new Map();
  for (const item of items) for (const tag of new Set(item.tags)) counts.set(tag, (counts.get(tag) || 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function validateCatalog(data) {
  if (!Array.isArray(data.items) || !Array.isArray(data.collections)) throw new Error('资源配置必须包含 items 和 collections 数组。');
  const ids = new Set();
  const lists = new Set(data.collections.map(list => list.id));
  for (const item of data.items) {
    if (!item.id || ids.has(item.id)) throw new Error(`资源标识缺失或重复： ${item.id}`);
    ids.add(item.id);
    if (!item.name || !['software', 'bookmark'].includes(item.type)) throw new Error(`资源名称或类型无效： ${item.id}`);
    if (!Array.isArray(item.tags) || !item.tags.every(tag => typeof tag === 'string') || !Array.isArray(item.lists) || !item.lists.every(id => lists.has(id))) throw new Error(`资源标签或列表无效： ${item.id}`);
    if (!/^https?:$/.test(new URL(item.url).protocol)) throw new Error(`资源链接无效： ${item.id}`);
    for (const image of [item.image, item.cover].filter(Boolean)) if (!/^(?:\.\/)?assets\/[a-z\d/_.-]+\.(?:svg|png|ico|webp|jpg|jpeg)$/i.test(image)) throw new Error(`图片必须是 assets/ 中的本地文件： ${item.id}`);
  }
  return data;
}
