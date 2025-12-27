// packages/utils/src/format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getType(data: any): string{
  if (typeof data === 'string') {
    return 'string';
  }
  if (typeof data === 'number') {
    return 'number';
  }
  if (typeof data === 'function') {
    return 'function';
  }
  if (typeof data === 'object') {
    return 'object';
  }
  if (typeof data === 'undefined') {
    return 'undefined';
  }
}

export function getInfo() {
  return 'Hello World';
}