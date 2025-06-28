import { lighten } from 'polished';
import Theme from './theme';

interface IStatusColors {
  [key: string]: { color: string; pulse?: boolean };
}

export const statusColors: IStatusColors = {
  completed: { color: Theme.PrimaryGreen },
  failed: { color: Theme.PrimaryRed },
  canceled: { color: Theme.PrimaryRed },
  retired: { color: Theme.PrimaryRed },
  not_started: { color: lighten(0.2, Theme.PrimaryGrey) },
  future: { color: lighten(0.2, Theme.PrimaryBlue) },
  expired: { color: lighten(0.2, Theme.PrimaryGrey) },
  started: { color: Theme.PrimaryOrange },
  issue: { color: Theme.PrimaryRed },
  error: { color: Theme.PrimaryRed },
  inprogress: { color: Theme.PrimaryBlue, pulse: true },
  success: { color: Theme.PrimaryGreen },
  pending: { color: Theme.PrimaryOrange },
};
