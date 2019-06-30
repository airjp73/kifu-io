import React from 'react';
import arrowRight from 'svg/arrow-right.svg';
import chevronLeft from 'svg/chevron-left.svg';
import chevronRight from 'svg/chevron-right.svg';
import fastForward from 'svg/fast-forward.svg';
import file from 'svg/file.svg';
import logIn from 'svg/log-in.svg';
import logOut from 'svg/log-out.svg';
import menu from 'svg/menu.svg';
import pause from 'svg/pause.svg';
import play from 'svg/play.svg';
import rewind from 'svg/rewind.svg';
import skipBack from 'svg/skip-back.svg';
import skipForward from 'svg/skip-forward.svg';
import uploadCload from 'svg/upload-cload.svg';
import user from 'svg/user.svg';

const svgMap = {
  'arrow-right': arrowRight,
  'chevron-left': chevronLeft,
  'chevron-right': chevronRight,
  'fast-forward': fastForward,
  file: file,
  'log-in': logIn,
  'log-out': logOut,
  menu: menu,
  pause: pause,
  play: play,
  rewind: rewind,
  'skip-back': skipBack,
  'skip-forward': skipForward,
  'upload-cload': uploadCload,
  user: user,
};

interface SvgProps {
  svg: string;
}

const Svg: React.FunctionComponent<SvgProps> = ({ svg }) => (
  <object type="image/svg+xml" data={''}>
    Your browser dow not support SVG
  </object>
);

export default Svg;
