import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Tabs from '../Tabs';
import TabBar from '../TabBar';
import TabContent from '../TabContent';
import TabContentArea from '../TabContentArea';
import ButtonTab from '../ButtonTab';

describe('Tabs', () => {
  const TestComponent: React.FunctionComponent<{
    defaultTab: string;
  }> = props => (
    <Tabs {...props}>
      <TabBar>
        <ButtonTab tabName="tab1" label="Tab 1 Button" />
        <ButtonTab tabName="tab2" label="Tab 2 Button" />
        <ButtonTab tabName="tab3" label="Tab 3 Button" />
      </TabBar>
      <TabContentArea>
        <TabContent tab="tab1">
          <p>Tab 1 Content</p>
        </TabContent>
        <TabContent tab="tab2">
          <p>Tab 2 Content</p>
        </TabContent>
        <TabContent tab="tab3">
          <p>Tab 3 Content</p>
        </TabContent>
      </TabContentArea>
    </Tabs>
  );

  test('Should render current tab and no others', () => {
    const rendered = render(<TestComponent defaultTab="tab1" />);
    expect(rendered.queryByText('Tab 1 Content')).toBeInTheDocument();
    expect(rendered.queryByText('Tab 2 Content')).not.toBeInTheDocument();
    expect(rendered.queryByText('Tab 3 Content')).not.toBeInTheDocument();
  });

  test('Should change tabs when clicking on tab buttons', () => {
    const rendered = render(<TestComponent defaultTab="tab1" />);
    expect(rendered.queryByText('Tab 1 Content')).toBeInTheDocument();
    expect(rendered.queryByText('Tab 2 Content')).not.toBeInTheDocument();
    expect(rendered.queryByText('Tab 3 Content')).not.toBeInTheDocument();

    // Can't assert the non-existence of previous tabs
    // The transitions mean that both tabs exist briefly
    fireEvent.click(rendered.getByText('Tab 3 Button'));
    expect(rendered.queryByText('Tab 3 Content')).toBeInTheDocument();

    fireEvent.click(rendered.getByText('Tab 2 Button'));
    expect(rendered.queryByText('Tab 2 Content')).toBeInTheDocument();
  });
});
