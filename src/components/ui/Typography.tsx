type TypographyComponent = {
  varient?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  addClass?: string;
  readonly children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function Typography({
  children,
  addClass,
  varient = "h1",
  ...props
}: TypographyComponent) {
  const classDefine = {
    h1: "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
    h2: "scroll-m-16 font-bold text-3xl tracking-tight lg:text-4xl",
    h3: "scroll-m-14 font-semibold text-2xl tracking-tight lg:text-3xl",
    h4: "scroll-m-12 font-medium text-xl tracking-tight lg:text-2xl",
    h5: "scroll-m-10 font-normal text-lg tracking-tight lg:text-xl",
    h6: "scroll-m-8 font-normal text-base tracking-tight lg:text-lg",
    p: "font-normal text-sm tracking-tight lg:text-md",
    span: "font-normal text-sm tracking-tight lg:text-md",
  };
  const Tag = varient;

  return (
    <Tag className={`${classDefine[varient]} ${addClass}`} {...props}>
      {children}
    </Tag>
  );
}
