import { useState, useEffect } from 'react';

/**
 * ローカルストレージと同期するカスタムフック
 * @param key ストレージのキー
 * @param initialValue 初期値
 * @param onInit 初期化時に実行したい関数
 * @returns [値, 値を更新する関数]
 */
export const useSyncLocalStorage = <T>(key: string, initialValue: T, onInit?: () => void) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 初回マウント時にストレージから読み込む
  useEffect(() => {
    const loadData = async () => {
        const result = await chrome.storage.local.get([key]);
        setStoredValue(result[key] || initialValue);
    };
    if (onInit) {
      onInit();
    }
    loadData();
  }, []);

  // 値が変更されたらストレージに保存する
  useEffect(() => {
    const saveData = async () => {
      await chrome.storage.local.set({ [key]: storedValue });
    };
    saveData();
  }, [key, storedValue]);

  return { storedValue, setStoredValue };
}
