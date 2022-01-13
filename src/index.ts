import "./styles.css";

import { launchAnimation } from "./neurons";

const blob1 = document.getElementById("blob1");
if (blob1) launchAnimation(blob1, { speedRatio: 1.2, color: 0x096479 });

const blob2 = document.getElementById("blob2");
if (blob2)
  launchAnimation(blob2, { dotRadius: 18, speedRatio: 2, color: 0x096479 });

const blob3 = document.getElementById("blob3");
if (blob3)
  launchAnimation(blob3, { dotRadius: 5, speedRatio: 1.5, color: 0x096479 });
