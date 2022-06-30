import { FC, PropsWithChildren } from 'react';

type WithAs = {
  as?: keyof JSX.IntrinsicElements;
};

const VisuallyHidden: FC<PropsWithChildren<WithAs>> = ({ children, as: As = 'span' }) => (
  <As
    style={{
      clip: 'rect(0px, 0px, 0px, 0px)',
      width: 1,
      height: 1,
      position: 'absolute',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </As>
);

export default VisuallyHidden;
