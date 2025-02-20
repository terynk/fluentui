import * as React from 'react';
import { Divider, FluentProvider, makeStyles, mergeClasses, tokens, Text, Subtitle2 } from '@fluentui/react-components';
import { Swatch } from '../Swatch/Swatch';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { ExportPanel } from '../Export/ExportPanel';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    minWidth: '750px',
    padding: '40px 10%',
    margin: '0 auto',
    gridRowGap: tokens.spacingVerticalXXXL,
  },
  sickerSheet: {
    display: 'flex',
    flexDirection: 'column',
    gridRowGap: tokens.spacingVerticalM,
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  const {
    state: { themeWithOverrides },
  } = useThemeDesigner();
  return (
    <FluentProvider theme={themeWithOverrides}>
      <ExportPanel />
      <div className={mergeClasses(styles.root, props.className)}>
        <h1 style={{ marginBottom: 0 }}>Fluent Theme Designer</h1>
        <Text>
          Welcome to the Fluent Theme Designer tool. This tool offers a step-by-step process to help you implement your
          organization’s brand colors within Microsoft products using Fluent 2. Inputting your organization’s key color
          value will output a 16-color ramp that passes contrast checks when used in tokens and implemented with Fluent
          2 components.
        </Text>
        <Palette />
        <div className={styles.sickerSheet}>
          <Divider />
          <Subtitle2>Component Swatch</Subtitle2>
        </div>
        <Swatch />
        <Divider />
        <ColorTokens />
      </div>
    </FluentProvider>
  );
};
