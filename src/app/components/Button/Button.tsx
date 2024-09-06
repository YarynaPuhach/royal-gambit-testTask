
import React, { useRef } from 'react';
import gsap from 'gsap';
import s from './Button.module.scss';
import classNames from 'classnames';


interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  magnetic?: boolean;
  speed?: number;
  tollerance?: number;
  scale?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  className = 'primary',
  onClick = () => { },
  type = 'button',
  magnetic = true,
  speed = 1,
  tollerance = 0.8,
  scale = 1.05,
}) => {
  const $root = useRef<HTMLButtonElement>(null);
  const $item = useRef<HTMLSpanElement>(null);
  const $hover = useRef<HTMLSpanElement>(null);
  const rootBound = useRef<DOMRect>();
  const itemBound = useRef<DOMRect>();
  const diffBound = useRef({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    if (!magnetic || disabled || !$root.current) return;

    gsap.killTweensOf($root.current);
    gsap.killTweensOf($item.current);
    gsap.set($root.current, {
      scale: scale,
      borderRadius: 8,
      zIndex: 100,
      boxShadow: '0 0 0 hsl(0deg 0% 0% / 0.34)',
    });

    rootBound.current = $root.current.getBoundingClientRect();
    itemBound.current = $item.current?.getBoundingClientRect();
    diffBound.current.x = (rootBound.current.width * scale - rootBound.current.width) / 2;
    diffBound.current.y = (rootBound.current.height * scale - rootBound.current.height) / 2;
  };

  const handleMouseLeave = () => {
    if (!magnetic || disabled || !$root.current) return;

    gsap.killTweensOf($root.current);
    gsap.killTweensOf($item.current);
    gsap.to($root.current, {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: 'none', 
      ease: 'elastic.out(1.1, .4)',
      duration: 1.2,
      zIndex: 0,
    });
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: 'elastic.out(1.1, .4)',
      duration: 1.2,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled || !$root.current || !rootBound.current) return;

    let x: number;
    let y: number;

    if (e.type === 'touchmove' || e.type === 'touchstart') {
      const touch = (e as React.TouchEvent<HTMLButtonElement>).touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      const mouseEvent = e as React.MouseEvent<HTMLButtonElement>;
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }

    const maxX = (rootBound.current.width - (itemBound.current?.width || 0)) / 2 * tollerance;
    const maxY = (rootBound.current.height - (itemBound.current?.height || 0)) / 2 * tollerance;

    const newX = gsap.utils.mapRange(0, rootBound.current.width * scale, -maxX, maxX, x - rootBound.current.x + diffBound.current.x);
    const newY = gsap.utils.mapRange(0, rootBound.current.height * scale, -maxY, maxY, y - rootBound.current.y + diffBound.current.y);

    const shadowX = -newX * 0.2;
    const shadowY = -newY * 0.2;

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: newX * 0.5,
      y: newY * 0.5, 
      ease: 'power3.out',
      duration: speed * 0.5, 
    });

    gsap.killTweensOf($root.current);
    gsap.to($root.current, {
      x: newX,
      y: newY,
      boxShadow: `${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.34)`,
      ease: 'power3.out',
      duration: speed,
      overwrite: true,
    });
  };

  return (
    <button
    className={classNames(
      s.button,
      {
        [s.primary]: className === 'primary',
        [s.secondary]: className === 'secondary',
      }
    )}
      ref={$root}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      style={{ borderRadius: 8 }}
    >
      <span
        ref={$item}
        className={s.text}
      >
        {children}
      </span>
      <span
        ref={$hover}
        className={s.hover}
      />
    </button>
  );
};

export default Button;