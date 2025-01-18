import React, { useEffect } from "react";

const iconfontUrl = ["//at.alicdn.com/t/c/font_4801317_9kjpq3ujtxs.js"];

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
  name: string;
  width?: string;
  height?: string;
}

const IconFont: React.FC<IconFontProps> = ({
  name,
  width = "1.2em",
  height = "1em",
}) => {
  useEffect(() => {
    // 加载 iconfont 脚本
    createScriptUrlElements(iconfontUrl.reverse());
  }, []);

  return (
    <svg className="svg-icon" aria-hidden="true" width={width} height={height}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default IconFont;
