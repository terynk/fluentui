import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  tokens,
  TabList,
  Tab,
  Input,
  Button,
  Dropdown,
  Option,
  Slider,
  Badge,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  Field,
  Persona,
  useId,
  Link,
} from '@fluentui/react-components';
import {
  SearchRegular,
  bundleIcon,
  MeetNowRegular,
  MeetNowFilled,
  CalendarLtrFilled,
  CalendarLtrRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, auto)',
    gap: tokens.spacingVerticalL,
  },
  avatar: {
    gridArea: '1 / 1 / 2 / 2',
    display: 'flex',
    gap: tokens.spacingVerticalL,
  },
  tabList: {
    gridArea: '2 / 1 / 3 / 2',
  },
  searchAndDropdownField: {
    gridArea: '3 / 1 / 4 / 2/',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  textAndSwitch: {
    gridArea: '1 / 2 / 2 / 3',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
    justifySelf: 'center',
    gap: tokens.spacingHorizontalL,
  },
  slider: {
    gridArea: '2 / 2 / 3 / 3',
    padding: tokens.spacingVerticalS,
    width: '200px',
    justifySelf: 'center',
  },
  switchButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  checkboxAndRadioGroup: {
    gridArea: '3 / 2 / 4 / 3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
  },
  descriptionField: {
    gridArea: '1 / 3 / 2 / 4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: tokens.spacingVerticalS,
  },
  icons: {
    gridArea: '2 / 3 / 3 / 4',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
    justifyContent: 'center',
  },
  link: {
    gridArea: '3 / 3 / 4 / 4',
    alignSelf: 'center',
  },
});

const MeetNowIcon = bundleIcon(MeetNowFilled, MeetNowRegular);
const CalendarLtrIcon = bundleIcon(CalendarLtrFilled, CalendarLtrRegular);

export const Swatch: React.FC = () => {
  const stickerSheetStyles = useStyles();
  const dropdownId = useId('dropdown-default');

  return (
    <div className={stickerSheetStyles.root}>
        <Persona
          name="Cameron Evans"
          secondaryText="Senior Researcher at Contoso"
          avatar={{ color: 'brand', badge: { status: 'available' } }}
          className={stickerSheetStyles.avatar}
        />
        <div className={stickerSheetStyles.tabList}>
        <TabList defaultSelectedValue="tab1">
          <Tab value="tab1">Home</Tab>
          <Tab value="tab2">Pages</Tab>
          <Tab value="tab3">Documents</Tab>
        </TabList>
      </div>
      <div className= {stickerSheetStyles.searchAndDropdownField}>
        <Field>
          <Input
            placeholder="Find"
            contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
          />
        </Field>
        <Dropdown aria-labelledby={dropdownId} placeholder="Select" inlinePopup>
          <Option value="Action 1">Action 1</Option>
          <Option value="Action 2">Action 2</Option>
          <Option value="Action 3">Action 3</Option>
        </Dropdown>
      </div>
      <div className={stickerSheetStyles.textAndSwitch}>
        <Button appearance="primary">Text</Button>
        <div className={stickerSheetStyles.switchButtons}>
          <Switch defaultChecked={true} label="On" />
          <Switch label="Off" />
        </div>
      </div>
      <Slider className={stickerSheetStyles.slider} defaultValue={50} />
      <div className={stickerSheetStyles.checkboxAndRadioGroup}>
        <div className={stickerSheetStyles.checkboxGroup}>
          <Checkbox defaultChecked={true} label="Option 1" />
          <Checkbox label="Option 2" />
        </div>
        <RadioGroup className={stickerSheetStyles.radioGroup}>
          <Radio defaultChecked={true} label="Option 1" />
          <Radio label="Option 2" />
        </RadioGroup>
      </div>
      <Field label="Description" required className={stickerSheetStyles.descriptionField}>
        <Input placeholder="Example Text" appearance="filled-darker" />
      </Field>
      <Link className={stickerSheetStyles.link} href="https://www.microsoft.com">
        Example link - www.microsoft.com
      </Link>
      <div className={stickerSheetStyles.icons}>
        <Badge size="extra-large" appearance="filled" icon={<CalendarLtrIcon />} />
        <Badge size="extra-large" appearance="ghost" icon={<CalendarLtrIcon />} />
        <Badge size="extra-large" appearance="outline" icon={<MeetNowIcon />} />
        <Badge size="extra-large" appearance="tint" icon={<MeetNowIcon />} />
      </div>
    </div>
  );
};
