import { Box, Flex, ThemeProvider, ThemeSwitch, Typography } from './index';
import './App.scss';

type ApiProp = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
};

type ComponentApi = {
  name: string;
  description: string;
  extendsType?: string;
  props: ApiProp[];
  notes?: string[];
};

const componentApis: ComponentApi[] = [
  {
    name: 'Button',
    description: 'Ant Design-compatible action trigger with type/color/variant and anchor mode support.',
    extendsType: 'HTMLAttributes + ButtonHTMLAttributes + AnchorHTMLAttributes',
    props: [
      { name: 'type', type: "'default' | 'primary' | 'dashed' | 'link' | 'text'", defaultValue: "'default'", description: 'Quick style preset.' },
      {
        name: 'variant',
        type: "'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link'",
        description: 'Explicit variant override.'
      },
      { name: 'color', type: 'ButtonColorType', description: 'Semantic/preset color.' },
      { name: 'shape', type: "'default' | 'circle' | 'round' | 'square'", defaultValue: "'default'", description: 'Button corner/icon shape.' },
      { name: 'size', type: "'small' | 'middle' | 'medium' | 'large'", defaultValue: "'middle'", description: 'Button size.' },
      { name: 'icon', type: 'ReactNode', description: 'Icon node content.' },
      { name: 'iconPlacement', type: "'start' | 'end'", defaultValue: "'start'", description: 'Icon position relative to text.' },
      { name: 'loading', type: "boolean | { delay?: number; icon?: ReactNode }", defaultValue: 'false', description: 'Loading state and optional delay/icon.' },
      { name: 'href', type: 'string', description: 'Render as anchor when provided.' },
      { name: 'ghost', type: 'boolean', defaultValue: 'false', description: 'Transparent ghost style.' },
      { name: 'block', type: 'boolean', defaultValue: 'false', description: 'Full-width button.' }
    ]
  },
  {
    name: 'Icon',
    description: 'Inline SVG icon component.',
    extendsType: 'SVGProps<SVGSVGElement>',
    props: [
      {
        name: 'name',
        type: "'search' | 'close' | 'check' | 'chevronDown' | 'info' | 'sun' | 'moon' | 'alert'",
        required: true,
        description: 'Icon glyph key.'
      },
      { name: 'size', type: 'number', defaultValue: '20', description: 'Rendered width/height in pixels.' }
    ]
  },
  {
    name: 'Input',
    description: 'Text input with optional label, hint, and error messaging.',
    extendsType: 'InputHTMLAttributes<HTMLInputElement>',
    props: [
      { name: 'label', type: 'string', description: 'Label text above the control.' },
      { name: 'hint', type: 'string', description: 'Helper text shown when there is no error.' },
      { name: 'error', type: 'string', description: 'Error message and error styling.' }
    ],
    notes: ['If `id` is omitted, a random input id is generated.']
  },
  {
    name: 'Form',
    description: 'Vertical form wrapper with configurable spacing.',
    extendsType: 'FormHTMLAttributes<HTMLFormElement>',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Form content.' },
      { name: 'gap', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Vertical space between fields.' }
    ]
  },
  {
    name: 'Spinner',
    description: 'Loading spinner element.',
    extendsType: 'HTMLAttributes<HTMLSpanElement>',
    props: [{ name: 'size', type: 'number', description: 'Spinner size in pixels.' }]
  },
  {
    name: 'Typography',
    description: 'Text primitive for semantic element, size style, and tone.',
    extendsType: 'HTMLAttributes<HTMLElement>',
    props: [
      { name: 'as', type: 'ElementType', defaultValue: "'p'", description: 'Rendered element or component.' },
      {
        name: 'variant',
        type: "'display' | 'title' | 'subtitle' | 'body' | 'caption' | 'code'",
        defaultValue: "'body'",
        description: 'Typography scale.'
      },
      {
        name: 'tone',
        type: "'default' | 'muted' | 'primary' | 'danger' | 'success'",
        defaultValue: "'default'",
        description: 'Text color tone.'
      }
    ]
  },
  {
    name: 'Box',
    description: 'Surface/layout wrapper with spacing and radius controls.',
    extendsType: 'HTMLAttributes<HTMLDivElement>',
    props: [
      { name: 'padding', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultValue: "'none'", description: 'Inner spacing token.' },
      { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: "'none'", description: 'Border radius token.' },
      { name: 'surface', type: 'boolean', defaultValue: 'false', description: 'Applies elevated surface styling.' }
    ]
  },
  {
    name: 'Flex',
    description: 'Flexbox layout built on Box props.',
    extendsType: 'BoxProps',
    props: [
      { name: 'direction', type: "'row' | 'column'", defaultValue: "'row'", description: 'Flex direction.' },
      { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", defaultValue: "'stretch'", description: 'Align-items.' },
      { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", defaultValue: "'start'", description: 'Justify-content.' },
      { name: 'gap', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultValue: "'none'", description: 'Gap token.' },
      { name: 'wrap', type: 'boolean', defaultValue: 'false', description: 'Wrap items onto multiple lines.' }
    ]
  },
  {
    name: 'Grid',
    description: 'Responsive grid layout built on Box props.',
    extendsType: 'BoxProps',
    props: [
      { name: 'columns', type: 'number', defaultValue: '2', description: 'Preferred column count.' },
      { name: 'minColumnWidth', type: 'string', defaultValue: "'12rem'", description: 'Minimum track width for auto-fit.' },
      { name: 'gap', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultValue: "'md'", description: 'Gap token.' }
    ]
  },
  {
    name: 'Checkbox',
    description: 'Checkbox control with optional label and hint.',
    extendsType: 'InputHTMLAttributes<HTMLInputElement>',
    props: [
      { name: 'label', type: 'string', description: 'Primary text next to checkbox.' },
      { name: 'hint', type: 'string', description: 'Secondary helper text.' }
    ]
  },
  {
    name: 'Select',
    description: 'Select control with label, hint, and error states.',
    extendsType: 'SelectHTMLAttributes<HTMLSelectElement>',
    props: [
      { name: 'label', type: 'string', description: 'Label text above the control.' },
      { name: 'hint', type: 'string', description: 'Helper text shown when there is no error.' },
      { name: 'error', type: 'string', description: 'Error message and error styling.' }
    ]
  },
  {
    name: 'Radio',
    description: 'Radio input with optional label.',
    extendsType: 'InputHTMLAttributes<HTMLInputElement>',
    props: [{ name: 'label', type: 'string', description: 'Label text next to radio.' }]
  },
  {
    name: 'Switch',
    description: 'Toggle switch input with optional label.',
    extendsType: 'InputHTMLAttributes<HTMLInputElement>',
    props: [{ name: 'label', type: 'string', description: 'Label text next to switch.' }]
  },
  {
    name: 'Textarea',
    description: 'Multiline text control with label, hint, and error states.',
    extendsType: 'TextareaHTMLAttributes<HTMLTextAreaElement>',
    props: [
      { name: 'label', type: 'string', description: 'Label text above the control.' },
      { name: 'hint', type: 'string', description: 'Helper text shown when there is no error.' },
      { name: 'error', type: 'string', description: 'Error message and error styling.' }
    ]
  },
  {
    name: 'Modal',
    description: 'Dialog rendered in a portal with overlay and escape handling.',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controls modal visibility.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Called on overlay click, close button click, and Escape.' },
      { name: 'title', type: 'string', description: 'Optional modal header title.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Modal body content.' },
      { name: 'className', type: 'string', description: 'Extra class for modal content panel.' }
    ]
  },
  {
    name: 'Tooltip',
    description: 'Hover tooltip wrapper.',
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip bubble content.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Trigger element content.' },
      { name: 'position', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: 'Bubble position.' },
      { name: 'className', type: 'string', description: 'Extra wrapper class.' }
    ]
  },
  {
    name: 'Tabs',
    description: 'Tab list and panel component.',
    props: [
      { name: 'items', type: 'TabItem[]', required: true, description: 'Tabs to render.' },
      { name: 'defaultTabId', type: 'string', description: 'Initially selected tab id.' },
      { name: 'className', type: 'string', description: 'Extra root class.' }
    ],
    notes: ['`TabItem` shape: `{ id: string; label: ReactNode; content: ReactNode }`.', 'Returns `null` if `items` is empty.']
  },
  {
    name: 'ThemeSwitch',
    description: 'Convenience switch bound to theme context.',
    props: [{ name: 'label', type: 'string', defaultValue: "'Dark mode'", description: 'Switch label.' }]
  },
  {
    name: 'ThemeProvider',
    description: 'Provides theme context and persists selected theme in localStorage.',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Wrapped application tree.' },
      { name: 'defaultTheme', type: "'light' | 'dark'", defaultValue: "'light'", description: 'Initial fallback theme.' },
      { name: 'storageKey', type: 'string', defaultValue: "'react-ui-theme'", description: 'localStorage key for persisted theme.' }
    ],
    notes: ['Applies the active theme by setting `data-theme` on `document.documentElement`.']
  }
];

function getSectionId(name: string) {
  return name.toLowerCase();
}

export default function App() {
  return (
    <ThemeProvider>
      <Box id="top" className="api-page" padding="xl">
        <Flex align="center" justify="between" gap="md" className="api-page__header">
          <div>
            <Typography as="h1" variant="display">
              React UI API Reference
            </Typography>
            <Typography tone="muted">
              Props and defaults for every exported component in this library.
            </Typography>
          </div>
          <ThemeSwitch />
        </Flex>

        <Box className="api-page__toc" surface radius="md" padding="lg">
          <Typography as="h2" variant="subtitle">
            Components
          </Typography>
          <div className="api-page__toc-grid">
            {componentApis.map((component) => (
              <a key={component.name} href={`#${getSectionId(component.name)}`} className="api-page__toc-link">
                {component.name}
              </a>
            ))}
          </div>
        </Box>

        <div className="api-page__sections">
          {componentApis.map((component) => (
            <Box
              key={component.name}
              id={getSectionId(component.name)}
              className="api-section"
              surface
              radius="md"
              padding="lg"
            >
              <Flex align="center" justify="between" gap="sm">
                <Typography as="h2" variant="title">
                  {component.name}
                </Typography>
                <a href="#top" className="api-section__back-link">
                  Back to top
                </a>
              </Flex>
              <Typography tone="muted">{component.description}</Typography>
              {component.extendsType ? (
                <Typography as="p" variant="caption" className="api-section__extends">
                  Also supports native props from <code>{component.extendsType}</code>.
                </Typography>
              ) : null}
              <div className="api-table-wrap">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th scope="col">Prop</th>
                      <th scope="col">Type</th>
                      <th scope="col">Required</th>
                      <th scope="col">Default</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.props.map((prop) => (
                      <tr key={prop.name}>
                        <td>
                          <code>{prop.name}</code>
                        </td>
                        <td>
                          <code>{prop.type}</code>
                        </td>
                        <td>{prop.required ? 'Yes' : 'No'}</td>
                        <td>{prop.defaultValue ?? '-'}</td>
                        <td>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {component.notes?.length ? (
                <ul className="api-section__notes">
                  {component.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </Box>
          ))}
        </div>
      </Box>
    </ThemeProvider>
  );
}
