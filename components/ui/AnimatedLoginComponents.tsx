import React, {
  memo,
  ReactNode,
  useState,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

// ==================== Input Component ====================

export const Input = memo(
  forwardRef(function Input(
    { className, type, containerClassName, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { containerClassName?: string },
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const radius = 100; 
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--highlight-color, #10b981),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cn("group/input rounded-lg p-[2px] transition duration-300 bg-white/5", containerClassName)}
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-white/10 bg-dark-950 px-3 py-2 text-sm text-white shadow-sm transition duration-400 
             file:border-0 file:bg-transparent file:text-sm file:font-medium 
             placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-[2px] 
             disabled:cursor-not-allowed disabled:opacity-50
             group-hover/input:shadow-none`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  })
);

Input.displayName = 'Input';

// ==================== BoxReveal Component ====================

type BoxRevealProps = {
  children: ReactNode;
  width?: string;
  boxColor?: string;
  duration?: number;
  overflow?: string;
  position?: string;
  className?: string;
};

export const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  overflow = 'hidden',
  position = 'relative',
  className,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      style={{
        position: position as any,
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial='hidden'
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#10b981',
          borderRadius: 4,
        }}
      />
    </div>
  );
});

// ==================== Ripple Component ====================

type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
};

export const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = '',
}: RippleProps) {
  return (
    <div
      className={cn(`absolute inset-0 flex items-center justify-center bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]`, className)}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className='absolute animate-ripple rounded-full border bg-white/5'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: '1px',
              borderColor: `rgba(255,255,255,${borderOpacity / 100})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
});

// ==================== OrbitingCircles Component ====================

type OrbitingCirclesProps = {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
};

export const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          className='pointer-events-none absolute inset-0 size-full'
        >
          <circle
            className='stroke-white/10 stroke-1'
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
          />
        </svg>
      )}
      <div
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-white/10 [animation-delay:calc(var(--delay)*1000ms)]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
});

// ==================== TechOrbitDisplay Component ====================

type IconConfig = {
  className?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: () => React.ReactNode;
};

type TechnologyOrbitDisplayProps = {
  iconsArray: IconConfig[];
  text?: React.ReactNode;
};

export const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text,
}: TechnologyOrbitDisplayProps) {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-dark-900'>
      {text}

      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}
    </div>
  );
});

// ==================== AnimatedForm Component ====================

type FieldType = 'text' | 'email' | 'password';

export type Field = {
  label: string;
  required?: boolean;
  type: FieldType;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type AnimatedFormProps = {
  header: React.ReactNode;
  subHeader?: string;
  fields: Field[];
  submitButton: string;
  textVariantButton?: React.ReactNode;
  errorField?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  topContent?: React.ReactNode;
  highlightColor?: string;
  buttonColorClass?: string;
  isLoading?: boolean;
};

export const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  textVariantButton,
  errorField,
  onSubmit,
  topContent,
  highlightColor = "#10b981",
  buttonColorClass = "bg-emerald-500 hover:bg-emerald-400",
  isLoading = false
}: AnimatedFormProps) {
  const [visible, setVisible] = useState<boolean>(false);
  
  const toggleVisibility = () => setVisible(!visible);

  return (
    // FIX: Removed w-96 fixed width, added w-full max-w-md for responsive behavior
    <div className='w-full max-w-md mx-auto flex flex-col gap-4 z-20 relative'>
      <BoxReveal boxColor={highlightColor} duration={0.3}>
        {header}
      </BoxReveal>

      <div className="pb-2 opacity-0 animate-[fadeIn_0.5s_ease-out_0.3s_forwards]">
          {subHeader && (
            <p className='text-gray-400 text-sm max-w-sm'>
              {subHeader}
            </p>
          )}
      </div>

      <div className="mb-4 opacity-0 animate-[fadeIn_0.5s_ease-out_0.4s_forwards]">
        {topContent && topContent}
      </div>

      <form onSubmit={onSubmit} className="opacity-0 animate-[fadeIn_0.5s_ease-out_0.5s_forwards]">
        <div className={`grid grid-cols-1 gap-4 mb-4`}>
          {fields.map((field) => (
            <div key={field.label} className='flex flex-col gap-2'>
              <label htmlFor={field.label} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200">
                {field.label} {field.required && <span className='text-red-500'>*</span>}
              </label>

              <div className='flex flex-col space-y-2 w-full'>
                <div className='relative' style={{ "--highlight-color": highlightColor } as React.CSSProperties}>
                  <Input
                    type={
                      field.type === 'password'
                        ? visible
                          ? 'text'
                          : 'password'
                        : field.type
                    }
                    id={field.label}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    required={field.required}
                  />

                  {field.type === 'password' && (
                    <button
                      type='button'
                      onClick={toggleVisibility}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white z-10'
                    >
                      {visible ? (
                        <Eye className='h-5 w-5' />
                      ) : (
                        <EyeOff className='h-5 w-5' />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-6 mb-2">
            {errorField && (
                <p className='text-red-500 text-sm'>{errorField}</p>
            )}
        </div>

        <button
          className={cn(
            `relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] outline-hidden hover:cursor-pointer transition-all`,
            buttonColorClass,
            isLoading && "opacity-70 cursor-not-allowed"
          )}
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? "Processando..." : <>{submitButton} &rarr;</>}
          <BottomGradient color={highlightColor} />
        </button>

        {textVariantButton && (
            <div className='mt-6 text-center'>
              {textVariantButton}
            </div>
        )}
      </form>
      
      {/* Quick manual style for fade-in without BoxReveal */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});

const BottomGradient = ({ color }: { color: string }) => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-white/50 to-transparent' />
      <span 
        className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-white to-transparent'
        style={{ backgroundColor: color }} 
      />
    </>
  );
};
