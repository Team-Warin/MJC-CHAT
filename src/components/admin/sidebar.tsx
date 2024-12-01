'use client'

import styles from '@/styles/dashboard.module.css';
import { Button } from '@nextui-org/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarLinks}>
                <Button
                    disabled
                    disableRipple
                >
                    DASHBOARD
                </Button>

                <AdminSidebarButton
                    router={router}
                    pathname={pathname}
                    href={'/admin/user'}
                    text={'USER'}
                />
                <AdminSidebarButton
                    router={router}
                    pathname={pathname}
                    href={'/admin/report'}
                    text={'QUESTION'}
                />
                {/* <AdminSidebarButton
                    router={router}
                    pathname={pathname}
                    href={'/admin/analytics'}
                    text={'ANALYTICS'}
                /> */}
            </div>
        </div>
    );
}

function AdminSidebarButton({
    router,
    pathname,
    href,
    text
}: {
    router: AppRouterInstance,
    pathname: string,
    href: string;
    text: string;
}) {
    return (
        <Button
            onClick={() => router.replace(href)}
            variant={pathname === href ? 'bordered' : 'light'}
            disableRipple
        >
            {text}
        </Button>
    )
}