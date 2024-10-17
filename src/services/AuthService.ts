// src/services/AuthService.ts
class AuthService {
    private static instance: AuthService;
    public isAuthenticated: boolean = !!localStorage.getItem('accessToken');
    private listeners: Array<() => void> = [];

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public setAuthenticated(value: boolean) {
        this.isAuthenticated = value;
        this.notifyListeners();
    }

    public logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.isAuthenticated = false;
        this.notifyListeners();
    }

    public addListener(listener: () => void) {
        this.listeners.push(listener);
    }

    public removeListener(listener: () => void) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener());
    }
}

export default AuthService.getInstance();
