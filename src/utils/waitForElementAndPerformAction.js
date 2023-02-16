// Wait elements to be present in the DOM and then pass a function to be executed
export function waitForElementAndPerformAction(selector, actionCallback) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        actionCallback(element);
        resolve();
      }
    }, 1000);
  });
}
