import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button/Button';
import { Alert } from '../src/components/Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Alert type="success" title="Success alert" />
      <Alert type="info" title="Info alert" />
      <Alert type="warning" title="Warning alert" />
      <Alert type="error" title="Error alert" />
    </div>
  )
};

export const WithDescriptionAndAction: Story = {
  render: () => (
    <Alert
      type="info"
      showIcon
      title="Processing deployment"
      description="A new release is being prepared and will be available shortly."
      action={
        <Button size="small" variant="outlined">
          View logs
        </Button>
      }
    />
  )
};

export const Closable: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return open ? (
      <Alert
        type="warning"
        title="Session will expire soon"
        description="Save your work to avoid data loss."
        closable={{
          closeIcon: true,
          onClose: () => setOpen(false),
          'aria-label': 'Dismiss alert'
        }}
      />
    ) : (
      <Button onClick={() => setOpen(true)}>Show alert</Button>
    );
  }
};

export const Banner: Story = {
  render: () => (
    <Alert
      banner
      title="Banner mode defaults to warning style and visible icon."
      description="Set type and showIcon explicitly to customize it."
    />
  )
};

function Crash({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error('Simulated render crash');
  }

  return <div>Component rendered safely.</div>;
}

export const ErrorBoundary: Story = {
  render: () => {
    const [crash, setCrash] = useState(false);

    return (
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <Button onClick={() => setCrash((current) => !current)}>
          {crash ? 'Render healthy component' : 'Trigger crash'}
        </Button>
        <Alert.ErrorBoundary title="Render failed in child component.">
          <Crash shouldCrash={crash} />
        </Alert.ErrorBoundary>
      </div>
    );
  }
};

