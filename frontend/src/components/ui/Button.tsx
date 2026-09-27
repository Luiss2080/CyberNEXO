import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-bg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-cyber-primary text-cyber-bg hover:bg-cyber-primary-hover focus:ring-cyber-primary',
    secondary: 'bg-cyber-surface text-cyber-text-main border border-cyber-border hover:bg-cyber-border focus:ring-cyber-text-muted',
    danger: 'bg-cyber-danger text-white hover:opacity-90 focus:ring-cyber-danger',
    ghost: 'bg-transparent text-cyber-primary hover:bg-cyber-surface focus:ring-cyber-primary'
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 rounded',
    md: 'text-base px-4 py-2 rounded-md',
    lg: 'text-lg px-6 py-3 rounded-lg'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
