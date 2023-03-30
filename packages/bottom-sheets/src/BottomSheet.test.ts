import {mount} from '@vue/test-utils';
import BottomSheet from './BottomSheet.vue';

describe('BottomSheet', () => {
  test('renders properly', () => {
    const wrapper = mount(BottomSheet, {
      props: {
        modelValue: true,
      },
      slots: {
        default: 'Hello BottomSheet',
      },
    });

    expect(wrapper.html()).toContain('<!--teleport start-->');
    expect(wrapper.html()).toContain('<!--teleport end-->');
    expect(wrapper.vm.modelValue).toBeTruthy();
  });
});
