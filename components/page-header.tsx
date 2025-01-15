interface PageHeaderProps {
  header: JSX.Element | string;
  subheader: JSX.Element | string;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <div className='space-y-2'>
      <div className='scroll-m-20 text-3xl font-bold tracking-tight'>
        {props.header}
      </div>
      <div className='text-base text-muted-foreground'>{props.subheader}</div>
    </div>
  );
}
