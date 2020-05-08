import React from 'react';
import { getClasses } from './requests';

export default function MainSection() {
  getClasses().then((resp) => console.log(resp));
  return <div></div>;
}
