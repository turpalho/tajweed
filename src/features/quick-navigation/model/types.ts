import { LucideIcon } from "lucide-react";

export interface NavigationItem {
    id: string;
    titleKey: string;
    icon: LucideIcon;
    subtitle: string;
    path: string;
    gradient: string;
}

export interface QuickNavigationProps {
    onNavigate: (path: string) => void;
}
