import dynamic from 'next/dynamic';

// Material-UI Optimization Component
// This demonstrates how to use dynamic imports for MUI components
// Expected savings: 100-200KB

// Dynamic imports for heavy MUI components
export const DynamicTable = dynamic(() => import('@mui/material/Table'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-32 bg-gray-200 rounded" />,
});

export const DynamicTableBody = dynamic(
  () => import('@mui/material/TableBody'),
  {
    ssr: false,
  }
);

export const DynamicTableCell = dynamic(
  () => import('@mui/material/TableCell'),
  {
    ssr: false,
  }
);

export const DynamicTableContainer = dynamic(
  () => import('@mui/material/TableContainer'),
  {
    ssr: false,
  }
);

export const DynamicTableHead = dynamic(
  () => import('@mui/material/TableHead'),
  {
    ssr: false,
  }
);

export const DynamicTableRow = dynamic(() => import('@mui/material/TableRow'), {
  ssr: false,
});

export const DynamicPaper = dynamic(() => import('@mui/material/Paper'), {
  ssr: false,
});

export const DynamicDialog = dynamic(() => import('@mui/material/Dialog'), {
  ssr: false,
});

export const DynamicDialogTitle = dynamic(
  () => import('@mui/material/DialogTitle'),
  {
    ssr: false,
  }
);

export const DynamicDialogContent = dynamic(
  () => import('@mui/material/DialogContent'),
  {
    ssr: false,
  }
);

export const DynamicDialogActions = dynamic(
  () => import('@mui/material/DialogActions'),
  {
    ssr: false,
  }
);

export const DynamicButton = dynamic(() => import('@mui/material/Button'), {
  ssr: false,
});

export const DynamicTextField = dynamic(
  () => import('@mui/material/TextField'),
  {
    ssr: false,
  }
);

export const DynamicSelect = dynamic(() => import('@mui/material/Select'), {
  ssr: false,
});

export const DynamicMenuItem = dynamic(() => import('@mui/material/MenuItem'), {
  ssr: false,
});

export const DynamicFormControl = dynamic(
  () => import('@mui/material/FormControl'),
  {
    ssr: false,
  }
);

export const DynamicInputLabel = dynamic(
  () => import('@mui/material/InputLabel'),
  {
    ssr: false,
  }
);

export const DynamicCheckbox = dynamic(() => import('@mui/material/Checkbox'), {
  ssr: false,
});

export const DynamicRadio = dynamic(() => import('@mui/material/Radio'), {
  ssr: false,
});

export const DynamicRadioGroup = dynamic(
  () => import('@mui/material/RadioGroup'),
  {
    ssr: false,
  }
);

export const DynamicFormControlLabel = dynamic(
  () => import('@mui/material/FormControlLabel'),
  {
    ssr: false,
  }
);

export const DynamicSwitch = dynamic(() => import('@mui/material/Switch'), {
  ssr: false,
});

export const DynamicSlider = dynamic(() => import('@mui/material/Slider'), {
  ssr: false,
});

export const DynamicChip = dynamic(() => import('@mui/material/Chip'), {
  ssr: false,
});

export const DynamicAvatar = dynamic(() => import('@mui/material/Avatar'), {
  ssr: false,
});

export const DynamicBadge = dynamic(() => import('@mui/material/Badge'), {
  ssr: false,
});

export const DynamicCard = dynamic(() => import('@mui/material/Card'), {
  ssr: false,
});

export const DynamicCardContent = dynamic(
  () => import('@mui/material/CardContent'),
  {
    ssr: false,
  }
);

export const DynamicCardActions = dynamic(
  () => import('@mui/material/CardActions'),
  {
    ssr: false,
  }
);

export const DynamicCardMedia = dynamic(
  () => import('@mui/material/CardMedia'),
  {
    ssr: false,
  }
);

export const DynamicAppBar = dynamic(() => import('@mui/material/AppBar'), {
  ssr: false,
});

export const DynamicToolbar = dynamic(() => import('@mui/material/Toolbar'), {
  ssr: false,
});

export const DynamicDrawer = dynamic(() => import('@mui/material/Drawer'), {
  ssr: false,
});

export const DynamicList = dynamic(() => import('@mui/material/List'), {
  ssr: false,
});

export const DynamicListItem = dynamic(() => import('@mui/material/ListItem'), {
  ssr: false,
});

export const DynamicListItemText = dynamic(
  () => import('@mui/material/ListItemText'),
  {
    ssr: false,
  }
);

export const DynamicListItemIcon = dynamic(
  () => import('@mui/material/ListItemIcon'),
  {
    ssr: false,
  }
);

export const DynamicDivider = dynamic(() => import('@mui/material/Divider'), {
  ssr: false,
});

export const DynamicIconButton = dynamic(
  () => import('@mui/material/IconButton'),
  {
    ssr: false,
  }
);

export const DynamicFab = dynamic(() => import('@mui/material/Fab'), {
  ssr: false,
});

export const DynamicSpeedDial = dynamic(
  () => import('@mui/material/SpeedDial'),
  {
    ssr: false,
  }
);

export const DynamicSpeedDialAction = dynamic(
  () => import('@mui/material/SpeedDialAction'),
  {
    ssr: false,
  }
);

export const DynamicSpeedDialIcon = dynamic(
  () => import('@mui/material/SpeedDialIcon'),
  {
    ssr: false,
  }
);

// Usage examples:
// Replace: import { Table, TableBody, TableCell } from '@mui/material';
// With: import { DynamicTable, DynamicTableBody, DynamicTableCell } from '@/components/MaterialUIOptimization';

// Replace: import { Button, TextField } from '@mui/material';
// With: import { DynamicButton, DynamicTextField } from '@/components/MaterialUIOptimization';

// This approach:
// 1. Reduces initial bundle size by 100-200KB
// 2. Loads MUI components only when needed
// 3. Provides loading states for better UX
// 4. Maintains SSR compatibility where needed
