var agent = window.navigator.userAgent.toLowerCase();
var appName = window.navigator.appName.toLowerCase();
if (
  (appName === "netscape" && agent.indexOf("trident") !== -1) ||
  agent.indexOf("msie") !== -1
) {
  if (
    confirm(
      "BAZZI.GG는 인터넷익스플로러(IE)브라우저를 지원하지 않습니다.\n크롬 혹은 엣지브라우저에서 정상적으로 작동됩니다.\n해당 브라우저로 이동하시겠습니까?"
    )
  ) {
    window.location = "microsoft-edge:" + window.location.href;
  }
}
