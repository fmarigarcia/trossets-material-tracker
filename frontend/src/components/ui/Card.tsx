import React from 'react';
import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('card', className)}>{children}</div>;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('card-header', className)}>{children}</div>;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('card-content', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn('card-footer', className)}>{children}</div>;
}
