'use client'

// import styles from '@/styles/admin.module.css';

import clsx from "clsx";
import React from 'react';
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from '@nextui-org/dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faHouseChimney,
    faPenToSquare,
    faUsers,
    faCaretDown,
    faHouse,
    faMessage
} from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <aside className='bg-white h-full w-64 py-6 px-3 shrink-0 overflow-y-auto scrollbar-hide border-r border-divider flex-col'>
            <div className='h-full'>
                {/* 헤더 */}
                <div className='flex gap-8 items-center px-6'>
                    <LogoDropdown
                        logo={<Image src={'/webps/mjc.webp'} alt='logo' width={30} height={30} />}
                        name='명전이'
                        description='관리자 패널'
                    />
                </div>
                {/* 몸체 */}
                <nav className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-6 mt-9 px-2'>
                        <AdminSidebarItem
                            router={router}
                            title="홈"
                            icon={<FontAwesomeIcon icon={faHouseChimney} />}
                            isActive={pathname === "/admin"}
                            href="/admin"
                        />
                        <AdminSidebarMenu
                            title='기본 메뉴'
                        >
                            <AdminSidebarItem
                                router={router}
                                title="유저"
                                icon={<FontAwesomeIcon icon={faUsers} />}
                                isActive={pathname === "/admin/user"}
                                href="/admin/user"
                            />
                            <AdminSidebarItem
                                router={router}
                                title="문의"
                                icon={<FontAwesomeIcon icon={faPenToSquare} />}
                                isActive={pathname === "/admin/report"}
                                href="/admin/report"
                            />
                            <AdminSidebarItem
                                router={router}
                                title="통계"
                                icon={<FontAwesomeIcon icon={faChartLine} />}
                                isActive={pathname === "/admin/analytics"}
                                href="/admin/analytics"
                            />
                        </AdminSidebarMenu>
                    </div>
                </nav>
                {/* 푸터 */}
                <div className='flex items-center justify-center gap-6 pt-16 pb-8 px-8'>

                </div>
            </div>
        </aside>
    );
}

function AdminSidebarMenu({ title, children }: { title: string, children?: React.ReactNode }) {
    return (
        <div className="flex gap-2 flex-col">
            <span className="text-xs font-normal">{title}</span>
            {children}
        </div>
    )
}

function AdminSidebarItem({
    router,
    title,
    icon,
    isActive,
    href
}: {
    router: AppRouterInstance,
    title: string,
    icon: JSX.Element,
    isActive: boolean;
    href: string;
}) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e);

        e.preventDefault(); // 기본 링크 동작 방지
        router.replace(href); // SPA 네비게이션
    }

    return (
        <div
            onClick={handleClick}
            className="text-gray-900 max-w-full"
        >
            <div
                className={clsx(
                    isActive
                        ? "bg-gray-100 [&_svg_path]:fill-gray-500"
                        : "hover:bg-gray-100",
                    "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
                )}
            >
                {icon}
                <span className="text-gray-900">{title}</span>
            </div>
        </div>
    )
}


/** Logo Dropdown */
function LogoDropdown({
    logo,
    name,
    description
}: {
    logo: React.ReactNode
    name: string,
    description: string
}) {
    return (
        <Dropdown
            className="w-full min-w-[260px]"
        >
            <DropdownTrigger className="cursor-pointer">
                <div className="w-full flex items-center gap-4">
                    {logo}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold m-0 text-gray-900 -mb-4 whitespace-nowrap">
                            {name}
                        </h3>
                        <span className="text-xs font-medium text-gray-500">
                            {description}
                        </span>
                    </div>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection title="이동">
                    <DropdownItem
                        key="1"
                        startContent={<FontAwesomeIcon icon={faHouse} />}
                        description="홈페이지로 이동"
                        className="py-4 text-base font-semibold"
                        href="/"
                    >
                        홈페이지
                    </DropdownItem>
                    <DropdownItem
                        key="2"
                        startContent={<FontAwesomeIcon icon={faMessage} />}
                        description="채팅방으로 이동"
                        className="py-4 text-base font-semibold"
                        href="/chat"
                    >
                        채팅방
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}