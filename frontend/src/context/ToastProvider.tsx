import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
    useRef
} from 'react';
import {Toast} from 'bootstrap';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used inside ToastProvider');
    }
    return context;
};

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const toastRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, {id, message, type}]);
    };

    useEffect(() => {
        toasts.forEach(toast => {
            const el = toastRefs.current.get(toast.id);
            if (!el) return;

            const instance = Toast.getOrCreateInstance(el);
            instance.show();

            el.addEventListener('hidden.bs.toast', () => {
                setToasts(prev => prev.filter(t => t.id !== toast.id));
                toastRefs.current.delete(toast.id);
            });
        });
    }, [toasts]);

    const getBgClass = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'text-bg-success';
            case 'error':
                return 'text-bg-danger';
            case 'warning':
                return 'text-bg-warning';
            default:
                return 'text-bg-info';
        }
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}

            <div className="toast-container position-fixed top-0 end-0 p-3">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        ref={el => {
                            if (el) toastRefs.current.set(toast.id, el);
                        }}
                        className={`toast ${getBgClass(toast.type)}`}
                        role="alert"
                        data-bs-delay="3000"
                    >
                        <div className="toast-body">
                            {toast.message}
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};