import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Pagination,
  PaginationProps,
  PaginationItemRenderProps,
  PaginationItemType
} from "@nextui-org/pagination";

export default function CustomPagination({
  total,
  initialPage,
  page,
  onChange
}: PaginationProps) {
  return (
    <Pagination
      total={total}
      initialPage={initialPage}
      page={page}
      onChange={onChange}
      renderItem={CustomPageNationRenderItem}
    />
  )
}

function CustomPageNationRenderItem({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) {
  if (value === PaginationItemType.NEXT) {
    return (
      <button key={key} className={"bg-default-200/50 min-w-8 w-8 h-8"} onClick={onNext}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button key={key} className={"bg-default-200/50 min-w-8 w-8 h-8"} onClick={onPrevious}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return <button key={key} className={className}>...</button>;
  }

  return (
    <button
      key={key}
      ref={ref}
      className={isActive ? "bg-gray-800 text-white min-w-8 w-8 h-8" : "bg-default-200/50 min-w-8 w-8 h-8"}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};