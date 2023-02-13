import React, { FC } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import type { MainLayoutProps } from './MainLayout';
import { MainLayout } from './MainLayout';

const meta: Meta = {
  component: MainLayout,
};

export default meta;

const ContentTemplate: FC<{ text: string }> = ({ text }) => {
  return <>{text}</>;
};

const Template: StoryFn<MainLayoutProps> = (args) => <MainLayout {...args} />;

export const All = Template.bind({});

All.args = {
  MainContent: <ContentTemplate text="Main Content"></ContentTemplate>,
  TopPanel: <ContentTemplate text="Top Panel"></ContentTemplate>,
  LeftPanel: <ContentTemplate text="Left Panel"></ContentTemplate>,
  RightPanel: <ContentTemplate text="Right Panel"></ContentTemplate>,
  FooterPanel: <ContentTemplate text="Footer Panel"></ContentTemplate>,
};

export const MainOnly = Template.bind({});

MainOnly.args = {
  MainContent: <ContentTemplate text="Main Content"></ContentTemplate>,
};