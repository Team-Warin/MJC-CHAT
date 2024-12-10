'use client';

import { User } from "@prisma/client";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faTrash, faInfo, faListDots, faFile, faArrowDownShortWide, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { Select, SelectItem } from "@nextui-org/select";

/** 테이블 검색창 */
export default function TableControls({
  searchQuery,
  onSearchChange,
  onSettingsClick,
  onDeleteClick,
  onInfoClick,
  onViewModeChange,
  onAddRowClick,
  onExportCSV,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSettingsClick: () => void;
  onDeleteClick: () => void;
  onInfoClick: () => void;
  onViewModeChange: () => void;
  onAddRowClick: () => void;
  onExportCSV: () => void;
}) {
  return (
    <div className="flex justify-between flex-wrap gap-4 items-center">
      <div className="flex items-center gap-1 flex-wrap md:flex-nowrap">
        <Input
          className="w-full"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button
          isIconOnly
          disableRipple
          variant="light"
          aria-label="Like">
          <FontAwesomeIcon icon={faGear} />
        </Button>

        <Button
          isIconOnly
          disableRipple
          variant="light"
          aria-label="Like">
          <FontAwesomeIcon icon={faTrash} />
        </Button>

        <Button
          isIconOnly
          disableRipple
          variant="light"
          aria-label="Like">
          <FontAwesomeIcon icon={faInfo} />
        </Button>

        <SortToggle
          sortBy="createdAt"
          onSortChange={console.log}
        />
      </div>
      <div className="flex flex-row gap-3.5 flex-wrap">
        <Button color="primary">
          Add Row
        </Button>
        <Button
          color="primary"
          startContent={<FontAwesomeIcon icon={faFile} />}
        >
          Export to CSV
        </Button>
      </div>
    </div>
  )
}

/** 정렬 토글 */
function SortToggle({
  sortBy,
  onSortChange
}: {
  sortBy: string,
  onSortChange: ({ sortBy, sortOrder }: { sortBy: string; sortOrder: string; }) => void;
}) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange({ sortBy, sortOrder: newOrder });
  };

  return (
    <Button
      isIconOnly
      disableRipple
      variant="light"
      aria-label="sort"
      onClick={toggleSortOrder}
    >
      <FontAwesomeIcon icon={sortOrder === "asc" ? faArrowDownShortWide : faArrowUpWideShort} />
    </Button>
  )
}

// /** TODO: 정렬 드롭다운 */
// function SortDropdown<T>({
//   columns,
//   onSortChange
// }: {
//   columns: (keyof T)[];
//   onSortChange: ({ sortBy, sortOrder }: { sortBy: keyof T; sortOrder: string; }) => void;
// }) {
//   const [sortBy, setSortBy] = useState<keyof T>(columns[0]);
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleSortByChange = (sortBy: keyof T) => {
//     setSortBy(sortBy);
//     onSortChange({ sortBy, sortOrder });
//   };

//   const handleSortOrderChange = (sortOrder: string) => {
//     setSortOrder(sortOrder);
//     onSortChange({ sortBy, sortOrder });
//   };

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button
//           isIconOnly
//           disableRipple
//           variant="light"
//           aria-label="sort">
//           <FontAwesomeIcon icon={faListDots} />
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu>
//         {/** sortBy section */}
//         <DropdownItem key="sortBy">
//           <strong>정렬 기준</strong>
//           <Select
//             placeholder="정렬 기준 선택"
//             selectedKeys={[String(sortBy)]}
//             onSelectionChange={(key) => handleSortByChange(key as keyof T)}
//             selectionMode="single"
//             className="w-full"
//           >
//             {columns.map((column) => (
//               <SelectItem
//                 key={String(column)}
//                 value={String(column)}
//               >
//                 {String(column)}
//               </SelectItem>
//             ))}
//           </Select>
//         </DropdownItem>
//         {/** sortOrder section */}
//         <DropdownItem>

//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   )
// }