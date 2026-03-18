import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Upload } from '../src/components/Upload/Upload';

const meta = {
  title: 'Components/Upload',
  component: Upload
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <Button>Select File</Button>
  }
};

export const WithDefaultList: Story = {
  args: {
    defaultFileList: [
      { uid: '1', name: 'spec.pdf', status: 'done', percent: 100 },
      { uid: '2', name: 'logo.png', status: 'uploading', percent: 50 }
    ],
    children: <Button type="default">Upload files</Button>
  }
};
