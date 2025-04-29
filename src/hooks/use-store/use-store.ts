import { useCallback, useEffect, useState } from "react";

const isDev = () => {
	return import.meta.env.MODE === "development";
};

const useDevState = <T>(initialValue: T) => {
	const [state, setState] = useState<T>(initialValue);

	return { storedValue: state, setStoredValue: setState };
};

const useChromeStorage = <T>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	const loadData = useCallback(async () => {
		const result = await chrome.storage.local.get([key]);
		setStoredValue(result[key]);
	}, [key]);

	const saveData = useCallback(async () => {
		await chrome.storage.local.set({ [key]: storedValue });
	}, [key, storedValue]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	useEffect(() => {
		saveData();
	}, [saveData]);

	return { storedValue, setStoredValue };
};

export const useStore = <T>(key: string, initialValue: T) => {
	// Viteの開発モードではchrome.storageが使用できないためuseStateでモックする
	return isDev()
		? useDevState(initialValue)
		: useChromeStorage(key, initialValue);
};
