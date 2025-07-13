import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

// Define type for the props of Avatar component
type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>((props, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      props.className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Define type for the props of AvatarImage component
type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>((props, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('object-cover h-full w-full', props.className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// Define type for the props of AvatarFallback component
type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>((props, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      props.className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
