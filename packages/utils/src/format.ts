// packages/utils/src/format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}