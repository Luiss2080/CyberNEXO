import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  hoverable = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = 'bg-cyber-surface border border-cyber-border rounded-xl shadow-lg overflow-hidden';
  const hoverStyles = hoverable ? 'transition-transform duration-300 hover:-translate-y-1 hover:border-cyber-primary/50 hover:shadow-cyber-primary/20' : '';
  
  const classes = `${baseStyles} ${hoverStyles} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-cyber-border ${className}`} {...props} />
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-cyber-border bg-cyber-bg/50 ${className}`} {...props} />
);
