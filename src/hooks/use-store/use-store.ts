import { useCallback, useEffect, useState } from "react";
import { useMount } from "../use-mount/use-mount";

const isDev = () => {
	return import.meta.env.MODE === "development";
};

const useDevState = <T>(initialValue: T) => {
	const [state, setState] = useState<T>(initialValue);

	return { state, setState };
};

const useChromeStorage = <T>(key: string, initialValue: T) => {
	const [state, setState] = useState<T>(initialValue);

	const loadData = useCallback(async () => {
		const result = await chrome.storage.local.get([key]);
		setState(result[key]);
	}, [key]);

	useMount(loadData);

	const saveData = useCallback(async () => {
		await chrome.storage.local.set({ [key]: state });
	}, [key, state]);

	useEffect(() => {
		saveData();
	}, [saveData]);

	return { state, setState };
};

export const useStore = <T>(key: string, initialValue: T) => {
	// Viteの開発モードではchrome.storageが使用できないためuseStateでモックする
	return isDev()
		? useDevState(initialValue)
		: useChromeStorage(key, initialValue);
};
