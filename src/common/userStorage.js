const STORAGE_KEY = "user";

export const getUser = () => {
    try{
        const userStorage = localStorage.getItem(STORAGE_KEY)
        return JSON.parse(userStorage)
    }catch(e){
        return []
    }
}

export const setUser = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

export const clearStorage = (key) => localStorage.removeItem(key)