export const arraysMatch = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

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
