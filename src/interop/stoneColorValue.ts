import { StoneColor } from 'goban/Goban';
import { stoneColor } from 'reason/goban/GobanVariants.gen';

const stoneColorValue = (
  color: StoneColor | stoneColor | null
): StoneColor | null => {
  switch (color) {
    case null:
    case 'b':
    case 'w':
      return color;
    case 'Black':
      return 'b';
    case 'White':
      return 'w';
  }
};

export default stoneColorValue;
