import VIcon from '@morpheme/icon';
import {Story, Meta} from '@storybook/vue3';
import {themeColors} from '@morpheme/utils';
import Select from './Select.vue';
import {ref} from 'vue';
import {ListboxButton} from '@headlessui/vue';
import {Field, useForm} from 'vee-validate';
import {array, object} from 'yup';
import {VBtn} from '@morpheme/button';
import SelectInput from './SelectInput.vue';

const items = [...Array(10)].map((_, index) => ({
  value: index + 1,
  text: `Option ${index + 1}`,
}));

export default {
  title: 'Experimental/Select',
  component: Select,
  argTypes: {
    color: {
      control: 'select',
      options: themeColors,
    },
  },
  args: {
    items,
  },
} as Meta;

const Template: Story<typeof Select> = (args) => ({
  components: {
    Select,
  },
  setup() {
    const value = ref();
    return {args, value};
  },
  template: `
    <Select v-bind="args" v-model="value" />
    <pre class="mt-2">Model Value: {{ value }}</pre>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Label = Template.bind({});
Label.args = {
  label: 'Label',
};

export const Hint = Template.bind({});
Hint.args = {
  hint: 'This is a hint',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  errorMessage: 'This is an error message.',
};

export const Shadow: Story<typeof Select> = (args) => ({
  components: {
    Select,
  },
  setup() {
    const value = ref();
    args.class = "mb-4";
    return {args, value};
  },
  template: `
    <Select v-bind="args" v-model="value" label="Default" hint="This is a hint" shadow />
    <Select v-bind="args" v-model="value" label="Shadow xs" hint="This is a hint" shadow="xs" />
    <Select v-bind="args" v-model="value" label="Shadow sm" hint="This is a hint" shadow="sm" />
    <Select v-bind="args" v-model="value" label="Shadow md" hint="This is a hint" shadow="md" />
    <Select v-bind="args" v-model="value" label="Shadow lg" hint="This is a hint" shadow="lg" />
    <Select v-bind="args" v-model="value" label="Shadow xl" hint="This is a hint" shadow="xl" />
    <Select v-bind="args" v-model="value" label="Shadow 2xl" hint="This is a hint" shadow="2xl" />
    <Select v-bind="args" v-model="value" label="Shadow 3xl" hint="This is a hint" shadow="3xl" />
    <Select v-bind="args" v-model="value" label="Shadow inner" hint="This is a hint" shadow="inner" />
    <Select v-bind="args" v-model="value" label="Shadow none" hint="This is a hint" shadow="none" />
  `,
});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Clearable = Template.bind({});
Clearable.args = {
  clearable: true,
};

export const Searchable = Template.bind({});
Searchable.args = {
  searchable: true,
};

export const SearchableMultiple = Template.bind({});
SearchableMultiple.args = {
  searchable: true,
  multiple: true,
  clearable: true
};

export const Uncontrolled: Story<typeof Select> = (args) => ({
  components: {
    Select,
  },
  setup() {
    return {args};
  },
  template: `
    <Select v-bind="args" />
  `,
});

export const Slots: Story<typeof Select> = (args) => ({
  components: {
    Select,
    ListboxButton,
    VIcon
  },
  setup() {
    return {args};
  },
  template: `
    <p>Custom Button</p>
    <Select v-bind="args">
      <template #button>
        <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-full shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span class="block truncate">Select an option</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <VIcon name="heroicons:chevron-up-down" class="w-4 h-4 text-gray-400" />
          </span>
        </ListboxButton>
      </template>
    </Select>
    
    <Select v-bind="args" class="mb-4" label="Custom Render Item" multiple>
      <template v-slot:item="{active, selected, item}">
        <div
          class="px-4 py-3 flex gap-2"
          :class="{
            'bg-gray-100 dark:bg-gray-true-800': active,
            'text-primary-500': selected,
          }"
        >
          <div class="flex-grow">{{ item.text }}</div>
          <span v-if="selected">✅</span>
        </div>
      </template>
    </Select>

    <Select v-bind="args" class="mb-4" label="Custom Selection" multiple>
      <template v-slot:selection="{active, selected, item}">
        <div
          v-if="selected"
          class="autocomplete-selection"
        >
          {{ selected.length }} Selected
        </div>
      </template>
    </Select>

    <Select v-bind="args" class="mb-4" label="Custom Selection Item" multiple>
      <template v-slot:selection-item="{item, remove}">
        <div
          class="px-2 py-1 text-sm rounded-full bg-error-500 text-white"
        >
          {{ item.text }}
          <button @click="remove">&times;</button>
        </div>
      </template>
    </Select>

    <Select v-bind="args" class="mb-4" label="Custom Hint" multiple>
      <template v-slot:hint>
        <p class="italic">This is a <span class="text-primary-500 font-medium">hint</span></p>
      </template>
    </Select>

    <Select
      v-bind="args"
      label="Custom Error"
      error
      error-message="This is an error message"
    >
      <template v-slot:error="{errorMessage}">
        <p class="text-red-700 font-medium">
          {{ errorMessage }}
        </p>
      </template>
    </Select>
  `,
});

export const DarkMode: Story<typeof Select> = (args) => ({
  components: {
    Select,
  },
  setup() {
    const value = ref();
    return {args, value};
  },
  template: `
    <div class="dark dark:bg-gray-true-900 p-6">
      <Select v-bind="args" label="Default" />
      <Select v-bind="args" label="Multiple" multiple />
    </div>
  `,
});

export const Validation: Story<{}> = (args) => ({
  components: {VBtn, Select, Field, SelectInput},
  setup() {
    const schema = object({
      genre: array().required().nullable().label('Genre'),
      gender: object().required().nullable().label('Gender'),
      fruit1: object().required().nullable().label('Fruit 1'),
      fruit2: array().required().nullable().label('Fruit 2'),
    });

    const {handleSubmit, resetForm, values, errors} = useForm({
      validationSchema: schema,
    });

    const onSubmit = handleSubmit((values) => {
      alert(JSON.stringify(values));
    });

    const genders = ref([
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ]);

    const fruits = ref([
      {
        text: 'Apple',
        value: 'apple',
      },
      {
        text: 'Manggo',
        value: 'manggo',
      },
      {
        text: 'Orange',
        value: 'orange'
      }
    ]);

    const genres = ref([
      {
        text: 'Pop',
        value: 'pop',
      },
      {
        text: 'Rock',
        value: 'rock',
      },
    ]);

    const handleReset = () => {
      resetForm();
    };

    return {
      onSubmit,
      resetForm,
      values,
      genders,
      genres,
      args,
      errors,
      fruits,
      handleReset,
    };
  },
  template: `
    <form @submit="onSubmit" class="border-none">
      <SelectInput
        v-model="values.genre"
        name="genre"      
        label="Current genre"
        placeholder="Select your genre"
        :items="genres"
        multiple
        class="mb-4"
      />
      <SelectInput
        v-model="values.gender"
        name="gender"      
        label="Gender"
        placeholder="Select your gender"
        :items="genders"
        class="mb-4"
      />
      <SelectInput
        v-model="values.fruit1"
        name="fruit1"      
        label="Fruit 1"
        placeholder="Choose"
        :items="fruits"
        class="mb-4"
        searchable
      />
      <SelectInput
        v-model="values.fruit2"
        name="fruit2"      
        label="Fruit 2"
        placeholder="Choose"
        :items="fruits"
        class="mb-4"
        searchable
        multiple
      />
      <div class="mt-4">
        <v-btn type="submit">Submit</v-btn>
        <v-btn type="reset" text @click="handleReset">Reset</v-btn>
      </div>
      <pre>{{ {values, errors} }}</pre>
    </form>
  `,
});