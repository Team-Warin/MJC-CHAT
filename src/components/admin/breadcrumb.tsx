'use client';

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { usePathname } from "next/navigation";

export default function AdminBreadCrumb() {
  const pathname = usePathname();

  // 경로 파싱
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <Breadcrumbs>
      {pathSegments.map((segment, index) => {
        // 경로 누적 생성
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        // 경로의 마지막은 링크 제거
        const isLast = index === pathSegments.length - 1;

        return (
          <BreadcrumbItem key={href} href={isLast ? undefined : href}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}