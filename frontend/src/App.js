import { Component, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { WeddingProvider } from "@/context/WeddingContext";
import { SmoothScrollProvider, useSmoothScroll } from "@/lib/SmoothScroll";
import GuestView from "@/pages/GuestView";
import HostPanel from "@/pages/HostPanel";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { err: false };
    }
    static getDerivedStateFromError() {
        return { err: true };
    }
    componentDidCatch(error) {
        console.error("Unhandled render error:", error);
    }
    render() {
        if (this.state.err) {
            return (
                <div className="grid min-h-screen place-items-center bg-ivory px-6 text-center font-body text-cocoa">
                    <div>
                        <p className="font-devanagari text-2xl text-maroon">॥ श्री गणेशाय नमः ॥</p>
                        <p className="mt-3">Something went wrong. Please refresh the page.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function ScrollManager() {
    const { pathname } = useLocation();
    const scrollTo = useSmoothScroll();
    useEffect(() => {
        scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
}

export default function App() {
    return (
        <ErrorBoundary>
            <WeddingProvider>
                <SmoothScrollProvider>
                    <BrowserRouter>
                        <ScrollManager />
                        <Routes>
                            <Route path="/" element={<GuestView />} />
                            <Route path="/host" element={<HostPanel />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </BrowserRouter>
                </SmoothScrollProvider>
            </WeddingProvider>
            <Toaster position="top-center" richColors />
        </ErrorBoundary>
    );
}
