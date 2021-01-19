const UrlRegex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

const isUrl = (url) => !!UrlRegex.test(url);

const fap = async (url) => {
  url = url.replaceAll(/\s/gm, "");
  if (!isUrl(url)) {
    console.error("oops, not a fap material");
    return;
  }

  await chrome.notifications.create("fap", {
    iconUrl: "icons/128.png",
    title: `Link detected ${url}`,
    message: "Happy fapping",
    type: "basic",
  });
  await chrome.tabs.create({ url: url });
};

chrome.contextMenus.create({
  title: "Fap now",
  contexts: ["selection"],
  onclick: async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    const msg = await chrome.tabs.sendMessage(tabs[0].id, { action: "fap" });
    if (!msg) return;
    await fap(msg.data);
  },
});
