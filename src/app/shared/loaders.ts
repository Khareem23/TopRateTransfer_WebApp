export class loaders {
  public static loadStyle(styleName: string) {
    const head = document.getElementsByTagName("head")[0];

    let themeLink = document.getElementById("client-theme") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = document.createElement("link");
      style.id = "client-theme";
      style.rel = "stylesheet";
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  public static loadScript(scriptName: string) {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute("src") != null &&
        scripts[i].getAttribute("src").includes("loader")
      ) {
        isFound = true;
      }
    }

    if (!isFound) {
      let node = document.createElement("script");
      node.src = `${scriptName}`;
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
}
