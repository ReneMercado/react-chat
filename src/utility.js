export const scrollToLastMessage = () => {
  window
    .jQuery(".messages")
    .getNiceScroll(0)
    .resize();

  window
    .jQuery(".messages")
    .getNiceScroll(0)
    .doScrollTop(
      document.getElementById("messages-container").scrollHeight - 1,
      999
    );
};


