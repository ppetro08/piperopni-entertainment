import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProfileSelectComponent } from './profile-select.component';

export default {
  title: 'ProfileSelectComponent',
  component: ProfileSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProfileSelectComponent>;

const Template: Story<ProfileSelectComponent> = (args: ProfileSelectComponent) => ({
  component: ProfileSelectComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    profiles:  [],
    disabled:  false,
    required:  false,
}