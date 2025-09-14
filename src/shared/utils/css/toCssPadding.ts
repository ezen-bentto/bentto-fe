import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import { toCssUnit } from './toCssUnit';

export const toCssSacing = (sizing: SpacingSize | number = 0): string => {
  if (typeof sizing === 'number' || typeof sizing === 'string') {
    return toCssUnit(sizing as number);
  }

  const px = sizing.x != null ? toCssUnit(sizing.x) : '0px';
  const py = sizing.y != null ? toCssUnit(sizing.y) : '0px';

  let top = py;
  let bottom = py;
  let left = px;
  let right = px;

  if (sizing.t != null) top = toCssUnit(sizing.t);
  if (sizing.b != null) bottom = toCssUnit(sizing.b);
  if (sizing.l != null) left = toCssUnit(sizing.l);
  if (sizing.r != null) right = toCssUnit(sizing.r);

  return `${top} ${right} ${bottom} ${left}`;
};
