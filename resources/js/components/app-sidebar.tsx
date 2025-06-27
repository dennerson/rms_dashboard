import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Globe, Calculator, Database, List } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'RMS',
        href: '/rms-web',
        icon: Globe,
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Quote',
        href: '/rms-quote',
        icon: Calculator,
    },
    {
        title: 'ClientData',
        href: '/rms-client-data',
        icon: Database,
    },
    {
        title: 'BranchList',
        href: '/rms-branch-list',
        icon: List,
    },
    // {
    //     // key: 'sub2',
    //     title: 'Navigation Two',
    //     // icon: <AppstoreOutlined />,
    //     children: [
    //         { key: '5', label: 'Option 5' },
    //         { key: '6', label: 'Option 6' },
    //         {
    //             key: 'sub3',
    //             label: 'Submenu',
    //             children: [
    //             { key: '7', label: 'Option 7' },
    //             { key: '8', label: 'Option 8' },
    //             ],
    //         },
    //     ],
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
