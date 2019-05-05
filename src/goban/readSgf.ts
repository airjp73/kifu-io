const readSgf = (sgf: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', () => resolve(fileReader.result));
    fileReader.readAsText(sgf);
  });
};

export default readSgf;
