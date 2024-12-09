import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationItemRenderProps, PaginationItemType } from "@nextui-org/pagination";

// 페이지네이션 커스텀
export default function PageNationRenderItem({
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