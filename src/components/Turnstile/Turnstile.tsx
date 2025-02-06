import React, { memo } from "react";
import { reqCaptcha } from "../../serices/api/auth";
import { showMessage } from "../message/MessageManager";

interface TurnstileProps {
  verifiedResultHandler: (success:boolean) => void;
}
const Turnstile: React.FC<TurnstileProps> = ({ verifiedResultHandler }) => {
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
  window.handleTurnstileSuccess = (token: string) => {
    reqCaptcha(token)
      .then(({ success }) => {
        showMessage({
          type: success ? "success" : "error",
          text: success ? "人机验证成功" : "人机验证失败",
        });
        verifiedResultHandler(success);
      })
      .catch(() => {
        showMessage({ type: "error", text: "人机验证出错" });
      });
  };

  return (
    <div
      className="cf-turnstile"
      data-sitekey="0x4AAAAAAA7vgIbRb89Iu2Uo"
      data-callback="handleTurnstileSuccess"
    ></div>
  );
};

export default memo(Turnstile);
