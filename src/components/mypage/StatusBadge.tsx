export default function StatusBadge({ hasAnswer }: { hasAnswer: boolean; }) {
  const statusStyles = hasAnswer
    ? {
      container: "flex items-center px-1.5 py-0.5 bg-[#cbf7dc] rounded-sm ",
      dot: "w-1.5 h-1.5 rounded-full bg-[#0a913e] mr-1",
      text: "text-[#3fd177] text-xs"
    }
    : {
      container: "flex items-center px-1.5 py-0.5 bg-[#F7EAD5] rounded-sm ",
      dot: "w-1.5 h-1.5 rounded-full bg-[#CA8A03] mr-1",
      text: "text-[#F5A525] text-xs"
    };

  return (
    <div className={statusStyles.container}>
      <div className={statusStyles.dot}></div>
      <span className={statusStyles.text}>
        {hasAnswer ? "처리완료" : "처리중"}
      </span>
    </div>
  );
};