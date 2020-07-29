import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Input from '.';

storiesOf('Input', module)
    .addDecorator(withKnobs)
    .add('Component', () => <Input placeholder={text('placeholder')}/>);
