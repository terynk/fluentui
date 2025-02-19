/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import {
  Button,
  Input,
  Slider,
  tokens,
  useId,
  Field,
  Subtitle2Stronger,
  Subtitle2,
  InfoLabel,
  Caption1
} from '@fluentui/react-components';
import { defaultThemePlaceholderName } from '../../Context/ThemeDesignerContext';
import { useDebounce } from '../../utils/useDebounce';

const LABELS_TEMPLATE_COLUMNS = '110px 100px';
const SLIDER_TEMPLATE_COLUMNS = '115px 50px';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '12px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: tokens.spacingVerticalL,
    padding: '12px 0px'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  keyColor: {
    paddingLeft: '0px',
  },
  labels: {
    display: 'grid',
    gridTemplateColumns: LABELS_TEMPLATE_COLUMNS,
    columnGap: tokens.spacingVerticalL,
    paddingBottom: '12px'
  },
  colorPicker: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    height: '45px',
    width: '45px',
    minWidth: 'min-content',
    cursor: 'pointer',
    display: 'flex',
    boxShadow: `inset 0 2px 4px ${tokens.colorNeutralShadowAmbient}, inset 0 2px 4px ${tokens.colorNeutralShadowKey}`,
    alignSelf: 'center',
    justifySelf: 'center',
  },
  color: {
    padding: '0px',
    border: 'none',
    opacity: '0',
    display: 'none',
  },
  colorValueInput: {
    width: '100px',
  },
  slider: {
    display: 'grid',
    gridTemplateColumns: SLIDER_TEMPLATE_COLUMNS,
    columnGap: '15px',
  },
  labelName: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    maxWidth: '400px',
    paddingBottom: '12px',
  },
  export: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

const DELAY_INPUT = 20;
export const Form: React.FC = () => {
  const styles = useStyles();
  const sidebarId = useId();

  const {
    dispatch,
    state: { themeName, keyColorHex },
  } = useThemeDesigner();
  const themeNameInputId = useId('themeNameInputId');

  const [keyColor, setKeyColor] = React.useState<string>(keyColorHex);
  const [hueTorsion, setHueTorsion] = React.useState<number>(0);
  const [vibrancy, setVibrancy] = React.useState<number>(0);

  // as the user moves through the wheel, we want the page to react in real time
  const debounceKeyColor: string = useDebounce(keyColor, DELAY_INPUT);
  const debounceHueTorsion: number = useDebounce(hueTorsion, DELAY_INPUT);
  const debounceVibrancy: number = useDebounce(vibrancy, DELAY_INPUT);

  React.useEffect(() => {
    dispatch({
      type: 'updateThemeWithCustomerAttributes',
      payload: {
        keyColor: debounceKeyColor.padEnd(7, '0'),
        hueTorsion: debounceHueTorsion / 100,
        vibrancy: debounceVibrancy / 100,
      },
    });
  }, [dispatch, debounceKeyColor, debounceHueTorsion, debounceVibrancy]);

  const generateHexColor = (e: React.ChangeEvent<HTMLInputElement>): string => {
    return '#' + e.target.value.replace(/[^0-9A-F]/gi, '').toUpperCase();
  };

  const handleKeyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the newly inputted hex code has a #
    const newHexColor = generateHexColor(e);
    setKeyColor(newHexColor);
  };

  const triggerColorPicker = () => {
    document.getElementById(sidebarId + 'keyColor Color')?.click();
  };

  const handleKeyColorBlur = () => {
    // Force padding if they blur
    setKeyColor(keyColorHex.padEnd(6, '0'));
  };
  const handleHueTorsionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHueTorsion(parseInt(e.target.value || '0', 10));
  };
  const handleVibrancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVibrancy(parseInt(e.target.value || '0', 10));
  };

  const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (newName.length === 0) {
      dispatch({ type: 'themeName', payload: defaultThemePlaceholderName });
    } else {
      const camelizeName = e.target.value
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
        .replace(/\s+/g, '')
        .replace(/[^A-Za-z0-9@]*/g, ``);
      dispatch({ type: 'themeName', payload: camelizeName });
    }
  };

  const showExportButton = () => {
    dispatch({ type: 'showExportPanel', payload: true });
  };

  return (
    <div className={styles.root} role="tabpanel" aria-labelledby="Edit">
      <Subtitle2Stronger as="h2">
        Start Here
      </Subtitle2Stronger>
      <div className={styles.header}>
        <Subtitle2>Step 1 - Color settings</Subtitle2>
        <InfoLabel as='label'
          info={
            <Caption1 as="h6">Use the Color Picker to select a color or enter a hex value in the text box below to generate a theme. Adjust the Hue Torsion and Vibrancy using the sliders below for further refinement.</Caption1>
          }>
        </InfoLabel>
      </div>
      <div className={styles.inputs}>
        <div className={styles.labels}>
          <Field label="Key color value">
            <Input
              appearance="outline"
              value={keyColor}
              onChange={handleKeyColorChange}
              maxLength={7}
              onBlur={handleKeyColorBlur}
              className={styles.colorValueInput}
            />
          </Field>
          <Button
            className={styles.colorPicker}
            style={{ backgroundColor: keyColor }}
            onClick={triggerColorPicker}
            shape="circular"
          />
          <input
            type="color"
            id={sidebarId + 'keyColor Color'}
            className={styles.color}
            value={keyColor}
            onChange={handleKeyColorChange}
          />
        </div>
      </div>
      <div>
        <Field label="Hue Torsion">
          <div className={styles.slider}>
            <Slider size="small" min={-50} max={50} value={hueTorsion} onChange={handleHueTorsionChange} />
            <Input
              size="small"
              type="number"
              min={-50}
              max={50}
              appearance="outline"
              value={hueTorsion.toString()}
              onChange={handleHueTorsionChange}
            />
          </div>
        </Field>
      </div>
      <div>
        <Field label="Vibrancy">
          <div className={styles.slider}>
            <Slider size="small" min={-50} max={50} value={vibrancy} onChange={handleVibrancyChange} />
            <Input
              size="small"
              type="number"
              min={-50}
              max={50}
              appearance="outline"
              value={vibrancy.toString()}
              onChange={handleVibrancyChange}
            />
          </div>
        </Field>
      </div>
      <div className={styles.header}>
        <Subtitle2>Step 2 - Export</Subtitle2>
        <InfoLabel as='label'
          info={<Caption1 as="h6">Enter a desired theme name below and click the Export button to export your theme</Caption1>
          }>
        </InfoLabel>
      </div>
      <div className={styles.labelName}>
        <Field label={'Theme name'}>
          <Input
            appearance="outline"
            id={themeNameInputId}
            onChange={handleThemeNameChange}
            placeholder={defaultThemePlaceholderName}
            value={themeName === defaultThemePlaceholderName ? '' : themeName}
          />
        </Field>
      </div>
      <Button size="small" appearance="primary" onClick={showExportButton}>Export</Button>
    </div>
  );
};
