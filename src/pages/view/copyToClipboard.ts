function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.innerText = str;

  document.body.appendChild(el);
  el.select();

  document.execCommand('copy');
  el.remove();
}

export default copyToClipboard;
