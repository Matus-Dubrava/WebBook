// post delete comfirmation dialog
(() => {
  const postDeleteBtn = document.querySelectorAll('.postDeleteBtn');

  if (postDeleteBtn.length) {
    Array.from(postDeleteBtn).forEach(btn => {
      btn.addEventListener('click', event => {
        const ans = confirm('Do you really wish to delete this post?');

        if (!ans) { event.preventDefault(); }
      });
    });
  }
})();
