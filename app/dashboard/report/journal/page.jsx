"use client";

import { useGetJournalReportQuery } from "@/app/redux/features/report/reportApi";

const JournalPage = () => {
  const { data } = useGetJournalReportQuery();
  console.log(data?.data);
  return (
    <div>
      <p>this is journal page</p>
    </div>
  );
};

export default JournalPage;
