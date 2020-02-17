// Used primarily to paste into the console and generate data
const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
];
const commands = ['add-move', 'add-b', 'add-w'];
let genData = howMany => {
  const data = [];
  for (let i = 0; i < howMany; i++) {
    const rand = num => Math.floor(Math.random() * num);
    const randomLetter = () => letters[rand(19)];
    const randomCommand = () => commands[rand(3)];
    data.push([randomCommand(), `${randomLetter()}${randomLetter()}`]);
  }
  return data;
};
