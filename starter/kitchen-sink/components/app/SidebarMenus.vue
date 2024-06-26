<script setup lang="ts">
import {
  Flag01Icon,
  Grid01Icon,
  Home01Icon,
  LayersTwo02Icon,
} from '@morphemeicons/vue/untitled';

const emit = defineEmits<{
  menuClick: [menu: MenuItem];
}>();

export interface MenuItem {
  text: string;
  icon?: Component;
  to?: string;
  children?: MenuItem[];
}

const menus = ref<MenuItem[]>([
  {
    text: 'Home',
    to: '/',
    icon: Home01Icon,
  },
  {
    text: 'Components',
    icon: LayersTwo02Icon,
    children: [
      {
        text: 'Alert',
        to: '/components/alert',
      },
      {
        text: 'AppBar',
        to: '/components/app-bar',
      },
      {
        text: 'AppShell',
        to: '/components/app-shell',
      },
      {
        text: 'Autocomplete',
        to: '/components/autocomplete',
      },
      {text: 'Avatar', to: '/components/avatar'},
      {text: 'Badge', to: '/components/badge'},
      {text: 'Banner', to: '/components/banner'},
      {text: 'BottomNavigation', to: '/components/bottom-navigation'},
      {text: 'BottomSheet', to: '/components/bottom-sheet'},
      {text: 'Breadcrumbs', to: '/components/breadcrumbs'},
      {text: 'Card', to: '/components/card'},
      {text: 'Collapse', to: '/components/collapse'},
      {text: 'Collapsible', to: '/components/collapsible'},
      {text: 'Command', to: '/components/command'},
      {text: 'DataTable', to: '/components/data-table'},
      {
        text: 'DataTablePagination',
        to: '/components/data-table-pagination',
      },
      {
        text: 'Divider',
        to: '/components/divider',
      },
      {
        text: 'Dropdown',
        to: '/components/dropdown',
      },
      {
        text: 'Icon',
        to: '/components/icon',
      },
      {
        text: 'List',
        to: '/components/list',
      },
      {
        text: 'Menu',
        to: '/components/menu',
      },
      {
        text: 'Menus',
        to: '/components/menus',
      },
      {
        text: 'Modal',
        to: '/components/modal',
      },
      {
        text: 'Navigation Drawer',
        to: '/components/navigation-drawer',
      },
      {
        text: 'Pagination',
        to: '/components/pagination',
      },
      {
        text: 'Popover',
        to: '/components/popover',
      },
      {
        text: 'Progress Bar',
        to: '/components/progress-bar',
      },
      {
        text: 'Progress Circular',
        to: '/components/progress-circular',
      },
      {
        text: 'Rating',
        to: '/components/rating',
      },
      {
        text: 'Select',
        to: '/components/select',
      },
      {
        text: 'Shimmer',
        to: '/components/shimmer',
      },
      {
        text: 'Spinner',
        to: '/components/spinner',
      },
      {
        text: 'Stepper',
        to: '/components/stepper',
      },
      {
        text: 'Switch',
        to: '/components/switch',
      },
      {
        text: 'Tabs',
        to: '/components/tabs',
      },
      {
        text: 'Timeline',
        to: '/components/timeline',
      },
      {
        text: 'Toast',
        to: '/components/toast',
      },
      {
        text: 'Text',
        to: '/components/text',
      },
      {
        text: 'Tooltip',
        to: '/components/tooltip',
      },
    ],
  },
  {
    text: 'Forms',
    icon: LayersTwo02Icon,
    children: [
      {
        text: 'Button',
        to: '/forms/buttons',
      },
      {
        text: 'Checkbox',
        to: '/forms/checkbox',
      },
      {
        text: 'Editor',
        to: '/forms/editor',
      },
      {
        text: 'FileInput',
        to: '/forms/file-input',
      },
      {
        text: 'FormSelect',
        to: '/forms/form-select',
      },
      {
        text: 'InputRange',
        to: '/forms/input-range',
      },
      {
        text: 'Input',
        to: '/forms/input',
      },
      {
        text: 'MultiSelect',
        to: '/forms/multi-select',
      },
      {
        text: 'QuillEditor',
        to: '/forms/quill-editor',
      },
      {
        text: 'RadioGroup',
        to: '/forms/radio-group',
      },
      {
        text: 'Radio',
        to: '/forms/radio',
      },
      {
        text: 'Textarea',
        to: '/forms/textarea',
      },
      {
        text: 'Validation',
        to: '/forms/validation',
      },
      {
        text: 'Standalone Components',
        to: '/forms/standalone',
      },
    ],
  },
  {
    text: 'Experimental',
    icon: LayersTwo02Icon,
    children: [
      {
        text: 'Autocomplete',
        to: '/forms/autocomplete',
      },
      {
        text: 'Select',
        to: '/forms/select',
      },
    ],
  },
  {
    text: 'Pages',
    icon: Flag01Icon,
    children: [
      {
        text: 'Login',
        to: '/pages/login',
      },
      {
        text: 'Register',
        to: '/pages/register',
      },
      {
        text: 'E-Commerce Landing',
        to: '/landing/commerce',
      },
    ],
  },
  {
    text: 'Application',
    icon: Grid01Icon,
    children: [
      {
        text: 'Inbox',
        to: '/inbox',
      },
      {
        text: 'Mobile App',
        to: '/mobile',
      },
      {
        text: 'Music App',
        to: '/music',
      },
    ],
  },
]);

const route = useRoute();

function isMenuActiveOnChildren(menu: MenuItem) {
  return menu.children?.some((child) =>
    route.path.startsWith(String(child.to)),
  );
}

function onMenuClick(menu: MenuItem) {
  emit('menuClick', menu);
}
</script>

<template>
  <VList hover class="sidebar-menus">
    <template v-for="menu in menus" :key="menu.text">
      <VListCollapse
        v-if="menu.children"
        :model-value="isMenuActiveOnChildren(menu)"
      >
        <template #activator="{isOpen, toggle}">
          <VListItem
            append-icon="ri:arrow-down-s-line"
            :append-icon-class="isOpen ? 'rotate-180' : ''"
            exact-active-class="active"
            :class="{
              active: isMenuActiveOnChildren(menu),
            }"
            @click="toggle"
          >
            <template #prepend>
              <component :is="menu.icon" class="w-5 h-5 text-current" />
            </template>
            {{ menu.text }}
          </VListItem>
        </template>
        <VList class="-mx-1">
          <VListItem
            v-for="child in menu.children"
            :key="child.text"
            :to="child.to"
            nuxt
            exact-active-class="active"
            @click="onMenuClick(child)"
          >
            <template #prepend>
              <component
                :is="child.icon"
                v-if="child.icon"
                class="w-5 h-5 text-current"
              />
            </template>
            {{ child.text }}
          </VListItem>
        </VList>
      </VListCollapse>
      <VListItem
        v-else
        :to="menu.to"
        nuxt
        exact-active-class="active"
        @click="onMenuClick(menu)"
      >
        <template #prepend>
          <component :is="menu.icon" class="w-5 h-5 text-current" />
        </template>
        {{ menu.text }}
      </VListItem>
    </template>
  </VList>
</template>

<style scoped lang="scss">
.active {
  background-color: var(--color-primary-600);
  color: var(--color-white);
  --v-list-item-icon-color: var(--color-white);

  &:hover {
    background-color: var(--color-primary-600) !important;
    color: var(--color-white) !important;
  }
}
</style>
