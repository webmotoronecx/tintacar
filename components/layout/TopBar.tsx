type TopBarProps = {
  html: string;
};

// Slim announcement strip above the header (content from site config)
export function TopBar({ html }: TopBarProps) {
  return (
    <div className="bg-mist">
      <p
        className="container-site py-2.5 text-center text-[12px] leading-5 text-ink md:py-[18px] md:text-[13px] [&_a]:underline [&_a:hover]:text-brand"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
