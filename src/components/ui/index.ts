// UI Components Index
// This file exports all UI components for cleaner imports

// Table Components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

// Avatar Components
export { Avatar, AvatarImage, AvatarFallback } from './avtar';

// Badge Component
export { Badge } from './badge';

// Dropdown Components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdownmenu';

// Skeleton Components (default exports)
export { default as Skeleton } from './Skeleton';
export { default as SkeletonCard } from './SkeletonCard';
export { default as SkeletonServiceCard } from './SkeletonServiceCard';

// Loading Components (named exports)
export {
  CardSkeleton,
  ServiceGridSkeleton,
  LoadingSpinner,
  PageLoading,
  LoadingButton,
} from './Loading';

// Other Components (default exports)
export { default as CdnImage } from './CdnImage';
export { default as ImageWithFallback } from './ImageWithFallback';
export { default as PageTitle } from './PageTitle';
