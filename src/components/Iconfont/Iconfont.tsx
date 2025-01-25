import React, { memo, MouseEventHandler, ReactEventHandler, useEffect, useMemo } from "react";
import { MessageComponentIcon, ReactTemplateIcon, SearchIcon } from "../../types/iconfont";

const iconfontUrl = [
  "//at.alicdn.com/t/c/font_4801317_9kjpq3ujtxs.js",
  "//at.alicdn.com/t/c/font_4817510_wp7edr2vfj.js",
  "//at.alicdn.com/t/c/font_4818206_a49yat5yptg.js",
];

export type IconName = MessageComponentIcon | ReactTemplateIcon | SearchIcon;

const createScriptUrlElements = (scriptUrls: string[], index = 0) => {
  const currentScriptUrl = scriptUrls[index];
  if (
    typeof currentScriptUrl === "string" &&
    currentScriptUrl.length &&
    !document.getElementById(currentScriptUrl)
  ) {
    const script = document.createElement("script");
    script.setAttribute("id", currentScriptUrl);
    script.setAttribute("src", currentScriptUrl);
    script.setAttribute("data-namespace", currentScriptUrl);

    if (scriptUrls.length > index + 1) {
      script.onload = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };

      script.onerror = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    document.body.appendChild(script);
  } else {
    if (scriptUrls.length > index + 1) {
      createScriptUrlElements(scriptUrls, index + 1);
    }
  }
};

createScriptUrlElements(iconfontUrl.reverse());

interface IconFontProps {
  name: IconName;
  width?: string;
  height?: string;
  fillColor?: string;
  onClick?: MouseEventHandler<HTMLOrSVGElement>;
}

const MemoIconFont: React.FC<IconFontProps> = ({
  name,
  width = "1.2em",
  height = "1em",
  fillColor,
  onClick,
}) => {
  useEffect(() => {
    // 加载 iconfont 脚本
    createScriptUrlElements(iconfontUrl.reverse());
  }, []);
  return useMemo(
    () => (
      <svg
        className="svg-icon"
        aria-hidden="true"
        width={width}
        fill={fillColor}
        height={height}
        onClick={onClick}
      >
        <use xlinkHref={`#${name}`} />
      </svg>
    ),
    [width, height, name, fillColor, onClick],
  );
};

const IconFont = memo(MemoIconFont);

export default IconFont;
