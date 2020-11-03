import React, { Fragment, useState } from 'react';
import {
  EuiButton,
  EuiPopover,
  EuiPopoverTitle,
  EuiSelectable,
  EuiPopoverFooter,
} from '@elastic/eui';

export default ({ getSelectedIndex }) => {
  const optionsData = [
    { id: 1, label: 'speed*', checked: 'on' },
    { id: 2, label: 'lighthouse-*' },
  ];
  const [options, setOptions] = useState(optionsData);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const getCheckedOption = () => {
    return options.filter((option) => option.checked === 'on')[0].label;
  };

  const onButtonClick = () => {
    // setOptions(options.slice().sort(Comparators.property('checked')));
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onChange = (options) => {
    setOptions(options);
  };

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Select index
    </EuiButton>
  );

  return (
    <Fragment>
      <EuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
      >
        <EuiSelectable
          singleSelection={'always'}
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          options={options}
          onChange={onChange}
        >
          {(list, search) => (
            <div style={{ width: 240 }}>
              <EuiPopoverTitle paddingsize="s">{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverFooter paddingsize="s">
                <EuiButton
                  size="s"
                  fullWidth
                  onClick={getSelectedIndex.bind(this, getCheckedOption())}
                >
                  Refresh
                </EuiButton>
              </EuiPopoverFooter>
            </div>
          )}
        </EuiSelectable>
      </EuiPopover>
    </Fragment>
  );
};
