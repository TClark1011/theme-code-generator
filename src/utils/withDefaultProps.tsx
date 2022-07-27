import React, { FC, ComponentProps } from 'react';

const withDefaultProps =
  <Props extends Record<string, any>, SelectedProps extends keyof Props>(
    Component: FC<Props>,
    defaultProps: Required<Pick<Props, SelectedProps>>
  ): FC<Omit<Props, SelectedProps> & Partial<Pick<Props, SelectedProps>>> =>
  // eslint-disable-next-line react/display-name
  (props) =>
    <Component {...({ ...defaultProps, ...props } as any as ComponentProps<typeof Component>)} />;

export default withDefaultProps;
