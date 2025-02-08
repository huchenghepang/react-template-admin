import dayjs, { ConfigType } from "dayjs";
import React from "react";

interface TimeFormatterProps {
  time: ConfigType; // 可以接受字符串、数字或 Date 对象
  format?: TimeFormat; // 可选的自定义时间格式
}

type TimeFormat =
  | "YYYY-MM-DD HH:mm:ss"
  | "YYYY/MM/DD HH:mm"
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "MMMM D, YYYY"
  | "dddd, MMMM D, YYYY"
  | "HH:mm"
  | "hh:mm A"
  | "YYYY-MM-DD"
  | "M/D/YYYY";


const TimeFormatter: React.FC<TimeFormatterProps> = ({
  time,
  format = "YYYY-MM-DD HH:mm:ss",
}) => {

  // 使用 dayjs 进行时间格式化
  const formattedTime = dayjs(time).format(format)

  return <span>{formattedTime}</span>;
};

export default TimeFormatter;
