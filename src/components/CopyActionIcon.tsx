import useDebouncedValueOverlap from '$/hooks/useDebouncedValueOverlap';
import useThemeSelector from '$/hooks/useThemeSelector';
import { _runAll } from '$/utils/runAll';
import { stubFn } from '$/utils/stubs';
import { ActionIcon, ActionIconProps, Paper, Popper, PopperProps, Transition } from '@mantine/core';
import { useClipboard, useDidUpdate } from '@mantine/hooks';
import { F } from '@mobily/ts-belt';
import { FC, useCallback, useState } from 'react';
import { Clipboard, ClipboardCheck } from 'tabler-icons-react';
import { Except, Merge } from 'type-fest';

type ActionIconUniqueProps = {
  text: string;
  onCopy?: () => void;
  onCopyTimeout?: () => void;
  onCopyStatusChange?: (a: boolean) => void;
  withPopper?: boolean;
  popperLabel?: string;
  popperProps?: Partial<PopperProps<HTMLDivElement>>;
};
export type CopyActionIconProps = Merge<ActionIconProps<'button'>, ActionIconUniqueProps>;

const ANIMATION_DURATION = 100;

const useCopyActionIconLogic = ({
  text,
  onCopyTimeout,
  onCopy,
  onCopyStatusChange,
}: Required<Except<ActionIconUniqueProps, 'withPopper' | 'popperLabel' | 'popperProps'>>) => {
  const { copied: wasRecentlyCopied, copy } = useClipboard();

  const copyText = useCallback(() => copy(text), [text, copy]);

  // We use overlapped debounce logic so that the fade in/out
  // animations on the clipboard icons don't overlap
  const { showBaseClipboard, showCheckedClipboard } = useDebouncedValueOverlap(
    wasRecentlyCopied,
    ANIMATION_DURATION,
    (originalWasRecentlyCopied, debouncedWasRecentlyCopied) => {
      return {
        showBaseClipboard: !originalWasRecentlyCopied && !debouncedWasRecentlyCopied,
        showCheckedClipboard: debouncedWasRecentlyCopied && originalWasRecentlyCopied,
      };
    }
  );

  useDidUpdate(() => {
    wasRecentlyCopied ? onCopy() : onCopyTimeout();
    onCopyStatusChange(wasRecentlyCopied);
  }, [wasRecentlyCopied]);

  return {
    copyText,
    showBaseClipboard,
    showCheckedClipboard,
    wasRecentlyCopied,
  };
};

// Can be used if you want to have a clipboard icon that
// copies some text when clicked. After the text is copied
// the checkbox icon is temporarily replaced with one with
// a checkmark
const CopyActionIcon: FC<CopyActionIconProps> = ({
  text,
  onCopy = stubFn,
  onCopyTimeout = stubFn,
  onClick = F.identity,
  onCopyStatusChange = stubFn,
  withPopper = false,
  popperLabel = 'Copied',
  popperProps = {},
  ...props
}) => {
  const { showBaseClipboard, showCheckedClipboard, copyText, wasRecentlyCopied } =
    useCopyActionIconLogic({
      text,
      onCopy,
      onCopyTimeout,
      onCopyStatusChange,
    });
  const [popperEl, setPopperEl] = useState<HTMLElement>();

  const handleClick = _runAll(onClick, copyText);
  const popperBg = useThemeSelector((t) => t.colors.dark[0]);

  return (
    <>
      <ActionIcon onClick={handleClick} {...props} ref={setPopperEl as any}>
        <Transition mounted={showBaseClipboard} transition="pop" duration={ANIMATION_DURATION}>
          {(styles) => <Clipboard style={styles} />}
        </Transition>
        <Transition mounted={showCheckedClipboard} transition="pop" duration={ANIMATION_DURATION}>
          {(styles) => <ClipboardCheck style={styles} />}
        </Transition>
      </ActionIcon>
      <Popper
        referenceElement={popperEl as any}
        mounted={wasRecentlyCopied && withPopper}
        withArrow
        arrowStyle={{
          backgroundColor: popperBg,
        }}
        arrowSize={3}
        {...popperProps}
      >
        <Paper
          color="blue"
          shadow="sm"
          sx={(t) => ({
            padding: '4px 8px',
            background: popperBg,
            color: t.colors.dark[9],
          })}
        >
          {popperLabel}
        </Paper>
      </Popper>
    </>
  );
};

export default CopyActionIcon;
