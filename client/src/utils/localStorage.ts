export function getLocalStorage<T>(key: string, initialValue: T) {
  const data = localStorage.getItem(key);
  if (!data) {
    setLocalStorage(key, initialValue);
    return initialValue;
  }
  return JSON.parse(data);
}

export function setLocalStorage<T>(key: string, data: T) {
  const raw = JSON.stringify(data);
  localStorage.setItem(key, raw);
}
