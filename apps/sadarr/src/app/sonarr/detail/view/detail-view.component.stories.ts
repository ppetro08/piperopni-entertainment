import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DetailViewComponent } from './detail-view.component';

export default {
  title: 'DetailViewComponent',
  component: DetailViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
} as Meta<DetailViewComponent>;

const Template: Story<DetailViewComponent> = (
  args: DetailViewComponent
) => ({
  component: DetailViewComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
};
